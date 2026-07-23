import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  // Task 1: All Four Binding Types
  
  // String Interpolation - Display portal name
  portalName = 'Student Course Portal';
  
  // Property Binding - Control button disabled state
  isPortalActive = true;
  
  // Event Binding - Button click handler
  message = '';
  
  // Two-Way Binding - Search input with ngModel
  searchTerm = '';
  
  // Task 2: Lifecycle Hooks
  coursesCount = 0;

  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    this.coursesCount = 12; // Simulate data fetch
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  // Event handler for button click
  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
