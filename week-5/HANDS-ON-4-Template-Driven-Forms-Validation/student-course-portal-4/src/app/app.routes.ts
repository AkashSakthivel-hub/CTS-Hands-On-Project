import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { EnrollmentFormComponent } from './pages/enrollment-form/enrollment-form.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'courses', component: CourseList },
  { path: 'enroll', component: EnrollmentFormComponent },
  { path: '**', redirectTo: '' }
];
