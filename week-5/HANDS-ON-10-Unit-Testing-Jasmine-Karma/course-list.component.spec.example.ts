// Example: course-list.component.spec.ts (with MockStore)
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CourseListComponent } from './course-list.component';
import { Course } from '../../models/course.model';
import * as CourseActions from '../../store/course/course.actions';
import * as CourseSelectors from '../../store/course/course.selectors';
import { By } from '@angular/platform-browser';

describe('CourseListComponent (with NgRx)', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'TypeScript', code: 'TS101', credits: 2, gradeStatus: 'pending' }
  ];

  const initialState = {
    course: {
      courses: mockCourses,
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    store.resetSelectors();
  });

  // Test 1: Component Creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Initial State Rendering
  it('should display courses from store', () => {
    fixture.detectChanges();

    const courseCards = fixture.debugElement.queryAll(By.css('.course-card'));
    expect(courseCards.length).toBe(2);

    const firstCard = courseCards[0].nativeElement;
    expect(firstCard.textContent).toContain('Angular');
  });

  it('should display course count', () => {
    fixture.detectChanges();

    const countElement = fixture.debugElement.query(By.css('.course-count'));
    expect(countElement.nativeElement.textContent).toContain('2 courses');
  });

  // Test 3: Loading State
  it('should display loading indicator when loading is true', () => {
    store.setState({
      course: {
        courses: [],
        loading: true,
        error: null
      }
    });

    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('.loading-spinner'));
    expect(loadingElement).toBeTruthy();

    const courseCards = fixture.debugElement.queryAll(By.css('.course-card'));
    expect(courseCards.length).toBe(0);
  });

  it('should hide course list when loading', () => {
    store.setState({
      course: {
        courses: mockCourses,
        loading: true,
        error: null
      }
    });

    fixture.detectChanges();

    const courseList = fixture.debugElement.query(By.css('.courses-grid'));
    expect(courseList).toBeFalsy();
  });

  // Test 4: Error State
  it('should display error message when error exists', () => {
    store.setState({
      course: {
        courses: [],
        loading: false,
        error: 'Failed to load courses'
      }
    });

    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.error-message'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('Failed to load courses');
  });

  it('should show retry button on error', () => {
    store.setState({
      course: {
        courses: [],
        loading: false,
        error: 'Network error'
      }
    });

    fixture.detectChanges();

    const retryButton = fixture.debugElement.query(By.css('.retry-button'));
    expect(retryButton).toBeTruthy();
  });

  // Test 5: Action Dispatching
  it('should dispatch loadCourses action on init', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({ type: '[Course] Load Courses' })
    );
  });

  it('should dispatch deleteCourse action when delete is clicked', () => {
    fixture.detectChanges();
    spyOn(store, 'dispatch');

    component.onDeleteCourse(1);

    expect(store.dispatch).toHaveBeenCalledWith(
      CourseActions.deleteCourse({ id: 1 })
    );
  });

  it('should dispatch addCourse action when add form is submitted', () => {
    spyOn(store, 'dispatch');

    const newCourse = {
      name: 'RxJS',
      code: 'RX201',
      credits: 3,
      gradeStatus: 'pending'
    };

    component.onAddCourse(newCourse);

    expect(store.dispatch).toHaveBeenCalledWith(
      CourseActions.addCourse({ course: newCourse })
    );
  });

  // Test 6: Empty State
  it('should display empty state when no courses', () => {
    store.setState({
      course: {
        courses: [],
        loading: false,
        error: null
      }
    });

    fixture.detectChanges();

    const emptyState = fixture.debugElement.query(By.css('.empty-state'));
    expect(emptyState).toBeTruthy();
    expect(emptyState.nativeElement.textContent).toContain('No courses available');
  });

  // Test 7: Selector Usage
  it('should select courses using selector', (done) => {
    component.courses$.subscribe(courses => {
      expect(courses).toEqual(mockCourses);
      done();
    });
  });

  it('should select loading state using selector', (done) => {
    component.loading$.subscribe(loading => {
      expect(loading).toBe(false);
      done();
    });
  });

  // Test 8: Multiple State Updates
  it('should update UI when store state changes', () => {
    fixture.detectChanges();
    let courseCards = fixture.debugElement.queryAll(By.css('.course-card'));
    expect(courseCards.length).toBe(2);

    // Update state
    store.setState({
      course: {
        courses: [mockCourses[0]],
        loading: false,
        error: null
      }
    });
    fixture.detectChanges();

    courseCards = fixture.debugElement.queryAll(By.css('.course-card'));
    expect(courseCards.length).toBe(1);
  });
});

// EXPECTED OUTPUT:
// CourseListComponent (with NgRx)
//   ✓ should create
//   ✓ should display courses from store
//   ✓ should display course count
//   ✓ should display loading indicator when loading is true
//   ✓ should hide course list when loading
//   ✓ should display error message when error exists
//   ✓ should show retry button on error
//   ✓ should dispatch loadCourses action on init
//   ✓ should dispatch deleteCourse action when delete is clicked
//   ✓ should dispatch addCourse action when add form is submitted
//   ✓ should display empty state when no courses
//   ✓ should select courses using selector
//   ✓ should select loading state using selector
//   ✓ should update UI when store state changes
//
// 14 specs, 0 failures
