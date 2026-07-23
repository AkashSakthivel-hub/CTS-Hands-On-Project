import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
  isEnrolled: boolean;
}

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard {
  @Input() course!: Course;
  @Input() index!: number;
  @Output() enrollRequested = new EventEmitter<number>();

  // Task 2: isExpanded for Show Details toggle
  isExpanded = false;

  // Task 2: Getter for ngClass - keeps template clean and logic in component
  // Getters compute values dynamically and make templates more readable
  get cardClasses() {
    return {
      'card--enrolled': this.course.isEnrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  // Task 2: Dynamic border color based on gradeStatus
  get borderStyle() {
    const colors = {
      'passed': '4px solid #27ae60',
      'failed': '4px solid #e74c3c',
      'pending': '4px solid #95a5a6'
    };
    return { 'border-left': colors[this.course.gradeStatus] };
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnroll(): void {
    this.enrollRequested.emit(this.course.id);
  }
}
