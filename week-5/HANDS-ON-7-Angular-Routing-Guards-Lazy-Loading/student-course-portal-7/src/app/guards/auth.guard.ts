import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Auth Guard - Protects routes from unauthorized access
 * 
 * FUNCTIONAL GUARD (Angular 15+ approach):
 * Uses CanActivateFn instead of class-based guard
 * 
 * HOW IT WORKS:
 * 1. Checks if user is authenticated via AuthService
 * 2. If authenticated → returns true (allow navigation)
 * 3. If not authenticated → navigates to home and returns false (block navigation)
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('Auth Guard: Access granted');
    return true;
  } else {
    console.log('Auth Guard: Access denied - redirecting to home');
    router.navigate(['/']);
    return false;
  }
};
