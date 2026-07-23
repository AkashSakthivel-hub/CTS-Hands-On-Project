import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
}

@Component({
  selector: 'app-course-card',
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  // Task 3: @Input - Receive course data from parent
  @Input() course!: Course;
  
  // Task 3: @Output - Emit enrollment event to parent
  @Output() enrollRequested = new EventEmitter<number>();

  // Task 2: Lifecycle Hook - ngOnChanges
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('Previous value:', changes['course'].previousValue);
      console.log('Current value:', changes['course'].currentValue);
    }
  }

  // Event handler - Emit course ID when enroll button is clicked
  onEnroll(): void {
    this.enrollRequested.emit(this.course.id);
  }
}
