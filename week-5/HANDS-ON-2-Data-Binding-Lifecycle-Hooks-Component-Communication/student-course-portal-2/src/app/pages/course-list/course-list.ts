import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
}

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  // Task 3: Array of course objects
  courses: Course[] = [
    { id: 1, name: 'Angular Basics', code: 'ANG101', credits: 3 },
    { id: 2, name: 'Advanced Angular', code: 'ANG201', credits: 4 },
    { id: 3, name: 'RxJS Mastery', code: 'RXJ101', credits: 3 },
    { id: 4, name: 'State Management', code: 'STATE101', credits: 4 },
    { id: 5, name: 'Testing Angular', code: 'TEST101', credits: 3 }
  ];
  
  // Selected course ID
  selectedCourseId: number | null = null;

  // Event handler - Receive enrollment event from child
  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
