import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  imports: [CommonModule],
  template: `
    <div class="summary-widget">
      <h3>📊 Course Summary</h3>
      <div class="summary-stats">
        <div class="stat-card">
          <span class="stat-value">{{ courseCount }}</span>
          <span class="stat-label">Total Courses</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ passedCount }}</span>
          <span class="stat-label">Passed</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ pendingCount }}</span>
          <span class="stat-label">Pending</span>
        </div>
      </div>
      <button class="add-btn" (click)="addSampleCourse()">+ Add Sample Course</button>
      <p class="info-text">
        This widget shares the same CourseService instance with CourseList and Home components.
      </p>
    </div>
  `,
  styles: [`
    .summary-widget {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    h3 { margin: 0 0 15px 0; font-size: 18px; }
    .summary-stats {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
    }
    .stat-card {
      flex: 1;
      background: rgba(255,255,255,0.2);
      padding: 10px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .stat-label {
      font-size: 12px;
      opacity: 0.9;
    }
    .add-btn {
      width: 100%;
      padding: 10px;
      background: rgba(255,255,255,0.3);
      border: 1px solid rgba(255,255,255,0.5);
      color: white;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    .add-btn:hover {
      background: rgba(255,255,255,0.4);
    }
    .info-text {
      margin-top: 10px;
      font-size: 11px;
      opacity: 0.8;
      text-align: center;
    }
  `]
})
export class CourseSummaryWidget implements OnInit {
  courseCount = 0;
  passedCount = 0;
  pendingCount = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.updateStats();
  }

  private updateStats(): void {
    const courses = this.courseService.getCourses();
    this.courseCount = courses.length;
    this.passedCount = courses.filter(c => c.gradeStatus === 'passed').length;
    this.pendingCount = courses.filter(c => c.gradeStatus === 'pending').length;
  }

  addSampleCourse(): void {
    const newCourse: Course = {
      id: this.courseService.getCourseCount() + 1,
      name: `Sample Course ${this.courseCount + 1}`,
      code: `SC${this.courseCount + 1}`,
      credits: 3,
      gradeStatus: 'pending'
    };
    this.courseService.addCourse(newCourse);
    this.updateStats();
    alert(`Course added! Check other components to see the shared state update.`);
  }
}
