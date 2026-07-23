// Example: course-card.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseCardComponent } from './course-card.component';
import { By } from '@angular/platform-browser';
import { DebugElement, SimpleChange } from '@angular/core';
import { Course } from '../../models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let compiled: HTMLElement;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseCardComponent]  // For module-based
      // imports: [CourseCardComponent]    // For standalone
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => {
    fixture.destroy();
  });

  // Test 1: Component Creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: @Input Rendering
  it('should display course name from @Input', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const courseNameElement = fixture.debugElement.query(By.css('h3'));
    expect(courseNameElement.nativeElement.textContent).toContain('Data Structures');
  });

  it('should display course code and credits', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const codeElement = fixture.debugElement.query(By.css('.course-code'));
    const creditsElement = fixture.debugElement.query(By.css('.course-credits'));

    expect(codeElement.nativeElement.textContent).toContain('CS101');
    expect(creditsElement.nativeElement.textContent).toContain('4');
  });

  it('should display grade status with correct class', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const statusElement = fixture.debugElement.query(By.css('.grade-status'));
    expect(statusElement.nativeElement.textContent).toContain('passed');
    expect(statusElement.nativeElement.classList).toContain('status-passed');
  });

  // Test 3: @Output Events
  it('should emit enrollRequested event when enroll button is clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    spyOn(component.enrollRequested, 'emit');

    const enrollButton = fixture.debugElement.query(By.css('.enroll-button'));
    enrollButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should emit deleteRequested event when delete button is clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    spyOn(component.deleteRequested, 'emit');

    const deleteButton = fixture.debugElement.query(By.css('.delete-button'));
    deleteButton.nativeElement.click();

    expect(component.deleteRequested.emit).toHaveBeenCalledWith(1);
  });

  // Test 4: ngOnChanges
  it('should log course name change in ngOnChanges', () => {
    spyOn(console, 'log');

    const changes = {
      course: new SimpleChange(null, mockCourse, true)
    };

    component.ngOnChanges(changes);

    expect(console.log).toHaveBeenCalledWith('Course changed:', mockCourse.name);
  });

  it('should handle course update in ngOnChanges', () => {
    const oldCourse = { ...mockCourse };
    const newCourse = { ...mockCourse, name: 'Advanced Data Structures' };

    component.course = oldCourse;
    fixture.detectChanges();

    const changes = {
      course: new SimpleChange(oldCourse, newCourse, false)
    };

    component.ngOnChanges(changes);

    expect(component.course.name).toBe('Advanced Data Structures');
  });

  // Test 5: Conditional Rendering
  it('should show enroll button when not enrolled', () => {
    component.course = mockCourse;
    component.isEnrolled = false;
    fixture.detectChanges();

    const enrollButton = fixture.debugElement.query(By.css('.enroll-button'));
    const unenrollButton = fixture.debugElement.query(By.css('.unenroll-button'));

    expect(enrollButton).toBeTruthy();
    expect(unenrollButton).toBeFalsy();
  });

  it('should show unenroll button when enrolled', () => {
    component.course = mockCourse;
    component.isEnrolled = true;
    fixture.detectChanges();

    const enrollButton = fixture.debugElement.query(By.css('.enroll-button'));
    const unenrollButton = fixture.debugElement.query(By.css('.unenroll-button'));

    expect(enrollButton).toBeFalsy();
    expect(unenrollButton).toBeTruthy();
  });
});

// EXPECTED OUTPUT:
// CourseCardComponent
//   ✓ should create
//   ✓ should display course name from @Input
//   ✓ should display course code and credits
//   ✓ should display grade status with correct class
//   ✓ should emit enrollRequested event when enroll button is clicked
//   ✓ should emit deleteRequested event when delete button is clicked
//   ✓ should log course name change in ngOnChanges
//   ✓ should handle course update in ngOnChanges
//   ✓ should show enroll button when not enrolled
//   ✓ should show unenroll button when enrolled
//
// 10 specs, 0 failures
