import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

// Custom Synchronous Validator
// Returns validation error if course code starts with 'XX'
function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && typeof value === 'string' && value.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Custom Async Validator
// Simulates an API call to check if email is already taken
// Returns error if email contains 'test@'
function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const value = control.value;
      if (value && value.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrls: ['./reactive-enrollment-form.component.css']
})
export class ReactiveEnrollmentFormComponent implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Build the reactive form using FormBuilder
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: [
        '',
        [Validators.required, Validators.email],
        [simulateEmailCheck] // Async validator as third argument
      ],
      courseId: ['', [Validators.required, noCourseCode]], // Custom sync validator
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue], // requiredTrue for checkboxes
      additionalCourses: this.fb.array([]) // FormArray for dynamic controls
    });
  }

  /**
   * Typed getter for additionalCourses FormArray
   * 
   * WHY THIS GETTER IS BETTER THAN CASTING IN THE TEMPLATE:
   * 1. Type Safety: Ensures we always get FormArray, not just AbstractControl
   * 2. DRY Principle: Avoids repeating the cast in multiple places in template
   * 3. Refactoring: If form structure changes, we only update one place
   * 4. Readability: Template code becomes cleaner and more maintainable
   * 5. Performance: The cast happens once per change detection cycle
   */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  /**
   * Adds a new course control to the FormArray
   */
  addCourse(): void {
    const courseControl = this.fb.control('', Validators.required);
    this.additionalCourses.push(courseControl);
  }

  /**
   * Removes a course control from the FormArray at specified index
   */
  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  /**
   * Form submission handler
   * 
   * DIFFERENCE BETWEEN value AND getRawValue():
   * - enrollForm.value: Returns only ENABLED controls (excludes disabled)
   * - enrollForm.getRawValue(): Returns ALL controls including disabled ones
   * 
   * Use getRawValue() when you need access to disabled field values
   * (e.g., for display purposes or server submission)
   */
  onSubmit(): void {
    if (this.enrollForm.valid) {
      console.log('Form Value (enabled controls only):', this.enrollForm.value);
      console.log('Raw Value (all controls):', this.enrollForm.getRawValue());
      
      this.submitted = true;

      // Reset success message after 3 seconds
      setTimeout(() => {
        this.submitted = false;
      }, 3000);
    } else {
      // Mark all controls as touched to show validation errors
      this.markFormGroupTouched(this.enrollForm);
    }
  }

  /**
   * Recursively marks all controls in a form group as touched
   * Useful for showing validation errors on submit attempt
   */
  private markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Helper method to get form control for template access
   */
  getControl(name: string): FormControl {
    return this.enrollForm.get(name) as FormControl;
  }

  /**
   * Resets the form to initial state
   */
  resetForm(): void {
    this.enrollForm.reset({
      preferredSemester: 'Odd', // Reset to default value
      agreeToTerms: false
    });
    this.submitted = false;
    
    // Clear all additional courses
    while (this.additionalCourses.length > 0) {
      this.additionalCourses.removeAt(0);
    }
  }
}
