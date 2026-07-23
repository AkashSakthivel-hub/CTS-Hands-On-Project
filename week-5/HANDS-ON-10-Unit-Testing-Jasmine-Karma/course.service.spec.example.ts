// Example: course.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular Basics', code: 'ANG101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'TypeScript', code: 'TS101', credits: 2, gradeStatus: 'in-progress' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no unexpected HTTP requests
  });

  // Test 1: Service Creation
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test 2: GET Courses
  it('should retrieve all courses via GET', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should retrieve a single course by id', () => {
    const courseId = 1;
    const mockCourse = mockCourses[0];

    service.getCourseById(courseId).subscribe(course => {
      expect(course).toEqual(mockCourse);
      expect(course.name).toBe('Angular Basics');
    });

    const req = httpMock.expectOne(`http://localhost:3000/courses/${courseId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  });

  // Test 3: POST - Create Course
  it('should create a new course via POST', () => {
    const newCourse: Omit<Course, 'id'> = {
      name: 'RxJS Fundamentals',
      code: 'RX201',
      credits: 3,
      gradeStatus: 'pending'
    };
    const createdCourse = { id: 3, ...newCourse };

    service.createCourse(newCourse).subscribe(course => {
      expect(course).toEqual(createdCourse);
      expect(course.id).toBe(3);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(createdCourse);
  });

  // Test 4: PUT - Update Course
  it('should update a course via PUT', () => {
    const updatedCourse: Course = {
      id: 1,
      name: 'Angular Advanced',
      code: 'ANG201',
      credits: 4,
      gradeStatus: 'completed'
    };

    service.updateCourse(updatedCourse).subscribe(course => {
      expect(course).toEqual(updatedCourse);
      expect(course.credits).toBe(4);
    });

    const req = httpMock.expectOne(`http://localhost:3000/courses/${updatedCourse.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCourse);
    req.flush(updatedCourse);
  });

  // Test 5: DELETE - Remove Course
  it('should delete a course via DELETE', () => {
    const courseId = 1;

    service.deleteCourse(courseId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`http://localhost:3000/courses/${courseId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  // Test 6: Error Handling - 500 Error
  it('should handle 500 error when fetching courses', () => {
    const errorMessage = 'Server error';

    service.getCourses().subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error) => {
        expect(error.message).toContain('Failed to load courses');
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  // Test 7: Error Handling - 404 Error
  it('should handle 404 error when course not found', () => {
    const courseId = 999;

    service.getCourseById(courseId).subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne(`http://localhost:3000/courses/${courseId}`);
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

  // Test 8: Error Handling - Network Error
  it('should handle network error', () => {
    service.getCourses().subscribe({
      next: () => fail('should have failed with network error'),
      error: (error) => {
        expect(error.message).toContain('Network error');
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    req.error(new ProgressEvent('error'), { 
      status: 0, 
      statusText: 'Network Error' 
    });
  });

  // Test 9: Multiple Requests
  it('should handle multiple simultaneous requests', () => {
    service.getCourses().subscribe();
    service.getCourseById(1).subscribe();

    const requests = httpMock.match(req => req.url.includes('courses'));
    expect(requests.length).toBe(2);

    requests[0].flush(mockCourses);
    requests[1].flush(mockCourses[0]);
  });

  // Test 10: Request Headers
  it('should send authorization header', () => {
    service.getCourses().subscribe();

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token-12345');
    req.flush(mockCourses);
  });
});

// EXPECTED OUTPUT:
// CourseService
//   ✓ should be created
//   ✓ should retrieve all courses via GET
//   ✓ should retrieve a single course by id
//   ✓ should create a new course via POST
//   ✓ should update a course via PUT
//   ✓ should delete a course via DELETE
//   ✓ should handle 500 error when fetching courses
//   ✓ should handle 404 error when course not found
//   ✓ should handle network error
//   ✓ should handle multiple simultaneous requests
//   ✓ should send authorization header
//
// 11 specs, 0 failures
