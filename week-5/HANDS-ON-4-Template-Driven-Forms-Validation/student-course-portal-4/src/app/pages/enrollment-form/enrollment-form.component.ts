import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enrollment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent {
  // Form model properties
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = '';
  agreeToTerms = false;
  
  submitted = false;

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Form Value:', form.value);
      console.log('Form Valid:', form.valid);
      this.submitted = true;
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        this.submitted = false;
      }, 3000);
    }
  }
}
