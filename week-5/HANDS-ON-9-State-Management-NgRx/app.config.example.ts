// Example: app.config.ts for Standalone Angular with NgRx
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { courseReducer } from './store/course/course.reducer';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';
import { CourseEffects } from './store/course/course.effects';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    
    // NgRx Store
    provideStore(), // Root store
    
    // Feature states
    provideState({ name: 'course', reducer: courseReducer }),
    provideState({ name: 'enrollment', reducer: enrollmentReducer }),
    
    // Effects
    provideEffects([CourseEffects]),
    
    // Redux DevTools
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Set to true in production
      autoPause: true, // Pauses recording when extension window is closed
      trace: false, // If set to true, will include stack trace for every action
      traceLimit: 75, // Maximum stack trace frames to be stored
    }),
  ]
};
