import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

/**
 * CourseService - Centralized service for course data management
 * 
 * PROVIDED IN: 'root' - This makes it a SINGLETON service
 * One instance is shared across the entire application.
 * All components that inject this service get the same instance.
 */
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Introduction to Computer Science',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: 2,
      name: 'Data Structures and Algorithms',
      code: 'CS201',
      credits: 4,
      gradeStatus: 'pending'
    },
    {
      id: 3,
      name: 'Database Management Systems',
      code: 'CS301',
      credits: 3,
      gradeStatus: 'passed'
    },
    {
      id: 4,
      name: 'Web Development',
      code: 'WEB201',
      credits: 3,
      gradeStatus: 'pending'
    },
    {
      id: 5,
      name: 'Software Engineering',
      code: 'SE301',
      credits: 4,
      gradeStatus: 'failed'
    }
  ];

  constructor() {
    console.log('CourseService instance created');
  }

  /**
   * Returns all courses
   */
  getCourses(): Course[] {
    return this.courses;
  }

  /**
   * Finds a course by ID
   */
  getCourseById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  /**
   * Adds a new course to the collection
   */
  addCourse(course: Course): void {
    this.courses.push(course);
  }

  /**
   * Gets the total count of courses
   */
  getCourseCount(): number {
    return this.courses.length;
  }
}
