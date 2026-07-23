import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

/**
 * EnrollmentService - Manages student course enrollments
 * 
 * Demonstrates SERVICE-TO-SERVICE INJECTION:
 * This service injects CourseService to resolve course IDs to full Course objects.
 * This is a powerful pattern for creating layered architectures.
 */
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  /**
   * Constructor with service-to-service injection
   * CourseService is injected to access course data
   */
  constructor(private courseService: CourseService) {
    console.log('EnrollmentService instance created');
  }

  /**
   * Enrolls a student in a course
   */
  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
      console.log(`Enrolled in course ID: ${courseId}`);
    }
  }

  /**
   * Unenrolls a student from a course
   */
  unenroll(courseId: number): void {
    const index = this.enrolledCourseIds.indexOf(courseId);
    if (index > -1) {
      this.enrolledCourseIds.splice(index, 1);
      console.log(`Unenrolled from course ID: ${courseId}`);
    }
  }

  /**
   * Checks if a student is enrolled in a course
   */
  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  /**
   * Gets all enrolled courses with full course details
   * Uses CourseService to resolve IDs to Course objects
   */
  getEnrolledCourses(): Course[] {
    return this.enrolledCourseIds
      .map(id => this.courseService.getCourseById(id))
      .filter((course): course is Course => course !== undefined);
  }

  /**
   * Gets the count of enrolled courses
   */
  getEnrolledCount(): number {
    return this.enrolledCourseIds.length;
  }
}
