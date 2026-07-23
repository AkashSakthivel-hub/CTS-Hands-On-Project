import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule],
  template: `
    <div class="course-detail-container">
      <button class="back-button" (click)="goBack()">
        ← Back to Courses
      </button>

      <div *ngIf="course" class="course-detail">
        <div class="course-header">
          <h1>{{ course.name }}</h1>
          <span class="course-code">{{ course.code }}</span>
        </div>

        <div class="course-info-grid">
          <div class="info-card">
            <span class="info-label">Credits</span>
            <span class="info-value">{{ course.credits }}</span>
          </div>
          <div class="info-card">
            <span class="info-label">Status</span>
            <span class="info-value" [class]="course.gradeStatus">
              {{ course.gradeStatus | uppercase }}
            </span>
          </div>
          <div class="info-card">
            <span class="info-label">Course ID</span>
            <span class="info-value">{{ course.id }}</span>
          </div>
        </div>

        <div class="course-description">
          <h3>Course Description</h3>
          <p>This is a comprehensive course covering all aspects of {{ course.name }}. 
             Students will gain practical experience and theoretical knowledge.</p>
        </div>

        <div class="routing-info">
          <h4>🔍 Routing Demonstration:</h4>
          <ul>
            <li><strong>Route Parameter:</strong> Loaded course ID from URL: <code>/courses/{{ course.id }}</code></li>
            <li><strong>ActivatedRoute:</strong> Used <code>route.snapshot.paramMap.get('id')</code></li>
            <li><strong>Service Integration:</strong> CourseService.getCourseById() fetched the data</li>
          </ul>
        </div>
      </div>

      <div *ngIf="!course" class="course-not-found">
        <h2>Course Not Found</h2>
        <p>The course with ID {{ courseId }} does not exist.</p>
        <button class="primary-button" (click)="goBack()">Return to Courses</button>
      </div>
    </div>
  `,
  styles: [`
    .course-detail-container {
      max-width: 900px;
      margin: 40px auto;
      padding: 30px;
    }
    .back-button {
      padding: 10px 20px;
      background: #f0f0f0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-bottom: 20px;
      transition: all 0.3s ease;
    }
    .back-button:hover {
      background: #e0e0e0;
      transform: translateX(-5px);
    }
    .course-detail {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 30px;
    }
    .course-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #f0f0f0;
    }
    .course-header h1 {
      margin: 0;
      color: #333;
      font-size: 28px;
    }
    .course-code {
      background: #4a90e2;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 14px;
    }
    .course-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .info-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .info-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .info-value {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }
    .info-value.passed { color: #28a745; }
    .info-value.failed { color: #dc3545; }
    .info-value.pending { color: #ffc107; }
    .course-description {
      margin-bottom: 30px;
    }
    .course-description h3 {
      color: #555;
      margin-bottom: 15px;
    }
    .course-description p {
      color: #666;
      line-height: 1.8;
    }
    .routing-info {
      background: #e7f3ff;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #4a90e2;
    }
    .routing-info h4 {
      margin: 0 0 15px 0;
      color: #4a90e2;
    }
    .routing-info ul {
      margin: 0;
      padding-left: 20px;
    }
    .routing-info li {
      margin: 8px 0;
      color: #666;
      line-height: 1.6;
    }
    .routing-info code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      color: #d63384;
      font-family: 'Courier New', monospace;
    }
    .course-not-found {
      text-align: center;
      padding: 60px 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .course-not-found h2 {
      color: #dc3545;
      margin-bottom: 15px;
    }
    .primary-button {
      margin-top: 20px;
      padding: 12px 24px;
      background: #4a90e2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
    }
    .primary-button:hover {
      background: #357abd;
    }
  `]
})
export class CourseDetail implements OnInit {
  course: Course | undefined;
  courseId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // Read the :id route parameter
    this.courseId = this.route.snapshot.paramMap.get('id');
    
    if (this.courseId) {
      const id = parseInt(this.courseId, 10);
      this.course = this.courseService.getCourseById(id);
      
      if (this.course) {
        console.log('Course loaded from route parameter:', this.course);
      } else {
        console.log('Course not found for ID:', id);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
