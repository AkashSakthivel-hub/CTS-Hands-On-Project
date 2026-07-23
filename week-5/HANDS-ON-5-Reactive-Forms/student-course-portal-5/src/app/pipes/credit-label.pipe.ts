import { Pipe, PipeTransform } from '@angular/core';

// Task 3: Custom Pipe - Transform credits number to human-readable label
// Pipes are pure by default - only re-run when input reference changes
// This is good for performance as Angular doesn't check mutable data changes
// Set pure: false only if you need to detect mutable changes (use sparingly)
@Pipe({
  name: 'creditLabel'
})
export class CreditLabelPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    // Handle edge cases
    if (value === null || value === undefined || value === 0) {
      return 'No Credits';
    }
    
    // Return singular or plural based on value
    if (value === 1) {
      return '1 Credit';
    }
    
    return `${value} Credits`;
  }
}
