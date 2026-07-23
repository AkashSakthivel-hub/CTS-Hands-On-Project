import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
  isEnrolled: boolean;
}

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  // Task 1: Structural Directives - *ngIf with isLoading
  isLoading = true;
  
  // Course array with gradeStatus for *ngSwitch
  courses: Course[] = [
    { id: 1, name: 'Angular Basics', code: 'ANG101', credits: 3, gradeStatus: 'passed', isEnrolled: true },
    { id: 2, name: 'Advanced Angular', code: 'ANG201', credits: 4, gradeStatus: 'pending', isEnrolled: false },
    { id: 3, name: 'RxJS Mastery', code: 'RXJ101', credits: 3, gradeStatus: 'failed', isEnrolled: true },
    { id: 4, name: 'State Management', code: 'STATE101', credits: 4, gradeStatus: 'passed', isEnrolled: false },
    { id: 5, name: 'Testing Angular', code: 'TEST101', credits: 1, gradeStatus: 'pending', isEnrolled: true }
  ];
  
  selectedCourseId: number | null = null;

  ngOnInit(): void {
    // Simulate loading for 1.5 seconds
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  // Task 1: trackBy function for performance optimization
  // trackBy tells Angular to track list items by their ID instead of object reference
  // This prevents unnecessary DOM re-renders when the array changes
  // Without trackBy, Angular re-renders ALL items even if only one changed
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
