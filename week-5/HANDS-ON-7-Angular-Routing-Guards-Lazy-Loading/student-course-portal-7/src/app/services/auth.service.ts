import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Hardcoded for demonstration purposes
  // In real app, this would check JWT token, session, etc.
  private isLoggedIn = false;

  constructor() {
    console.log('AuthService initialized');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  /**
   * Simulate login
   */
  login(): void {
    this.isLoggedIn = true;
    console.log('User logged in');
  }

  /**
   * Simulate logout
   */
  logout(): void {
    this.isLoggedIn = false;
    console.log('User logged out');
  }

  /**
   * Toggle authentication state (for demo purposes)
   */
  toggleAuth(): void {
    this.isLoggedIn = !this.isLoggedIn;
    console.log(`Auth state toggled: ${this.isLoggedIn ? 'Logged In' : 'Logged Out'}`);
  }
}
