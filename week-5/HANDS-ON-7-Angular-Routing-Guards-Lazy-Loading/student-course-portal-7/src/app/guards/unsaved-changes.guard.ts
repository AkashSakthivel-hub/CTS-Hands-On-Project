import { CanDeactivateFn } from '@angular/router';
import { ReactiveEnrollmentFormComponent } from '../pages/reactive-enrollment-form/reactive-enrollment-form.component';

/**
 * Unsaved Changes Guard - Prevents accidental data loss
 * 
 * CANDEACTIVATE GUARD:
 * Checks if form has unsaved changes before allowing navigation away
 * 
 * USER-FRIENDLY FEATURE:
 * One of the most important UX features for form-heavy applications
 * Prevents users from accidentally losing their work
 * 
 * HOW IT WORKS:
 * 1. Checks if the form is dirty (has unsaved changes)
 * 2. If pristine → allows navigation (return true)
 * 3. If dirty → shows confirmation dialog
 * 4. User clicks OK → allows navigation (return true)
 * 5. User clicks Cancel → stays on page (return false)
 */
export const unsavedChangesGuard: CanDeactivateFn<ReactiveEnrollmentFormComponent> = (component) => {
  if (component.enrollForm && component.enrollForm.dirty) {
    const confirmLeave = window.confirm(
      'You have unsaved changes. Are you sure you want to leave this page?'
    );
    
    if (confirmLeave) {
      console.log('Unsaved Changes Guard: User confirmed navigation');
      return true;
    } else {
      console.log('Unsaved Changes Guard: User cancelled navigation');
      return false;
    }
  }
  
  console.log('Unsaved Changes Guard: No unsaved changes, allowing navigation');
  return true;
};
