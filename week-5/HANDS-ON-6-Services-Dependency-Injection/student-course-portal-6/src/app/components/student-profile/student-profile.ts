import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <h2>👤 Student Profile</h2>
      
      <div class="profile-section">
        <h3>My Enrolled Courses ({{ enrolledCount }})</h3>
        
        <div *ngIf="enrolledCourses.length === 0" class="empty-state">
          <p>No courses enrolled yet.</p>
          <p class="hint">Go to the Courses page and click "Enroll" on any course.</p>
        </div>
        
        <div class="enrolled-list">
          <div *ngFor="let course of enrolledCourses" class="enrolled-course">
            <div class="course-info">
              <h4>{{ course.name }}</h4>
              <p class="course-code">{{ course.code }} • {{ course.credits }} credits</p>
            </div>
            <span class="status-badge" [class]="course.gradeStatus">
              {{ course.gradeStatus | uppercase }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="service-info">
        <strong>🔧 Service Injection:</strong>
        <p>This component injects EnrollmentService to display enrolled courses.</p>
        <p>EnrollmentService uses CourseService internally (service-to-service injection).</p>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 40px auto;
      padding: 30px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h2 {
      color: #333;
      margin-bottom: 30px;
      border-bottom: 2px solid #4a90e2;
      padding-bottom: 10px;
    }
    .profile-section {
      margin-bottom: 30px;
    }
    h3 {
      color: #555;
      margin-bottom: 20px;
      font-size: 18px;
    }
    .empty-state {
      text-align: center;
      padding: 40px;
      background: #f8f9fa;
      border-radius: 8px;
      color: #666;
    }
    .hint {
      font-size: 14px;
      color: #4a90e2;
      margin-top: 10px;
    }
    .enrolled-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .enrolled-course {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #4a90e2;
    }
    .course-info h4 {
      margin: 0 0 5px 0;
      color: #333;
      font-size: 16px;
    }
    .course-code {
      margin: 0;
      color: #666;
      font-size: 14px;
    }
    .status-badge {
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
    }
    .status-badge.passed {
      background: #d4edda;
      color: #155724;
    }
    .status-badge.failed {
      background: #f8d7da;
      color: #721c24;
    }
    .status-badge.pending {
      background: #fff3cd;
      color: #856404;
    }
    .service-info {
      padding: 15px;
      background: #e7f3ff;
      border-left: 4px solid #4a90e2;
      border-radius: 4px;
      font-size: 14px;
    }
    .service-info strong {
      color: #4a90e2;
      display: block;
      margin-bottom: 8px;
    }
    .service-info p {
      margin: 5px 0;
      color: #666;
    }
  `]
})
export class StudentProfile implements OnInit {
  enrolledCourses: Course[] = [];
  enrolledCount = 0;

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.loadEnrolledCourses();
  }

  private loadEnrolledCourses(): void {
    this.enrolledCourses = this.enrollmentService.getEnrolledCourses();
    this.enrolledCount = this.enrollmentService.getEnrolledCount();
  }
}
