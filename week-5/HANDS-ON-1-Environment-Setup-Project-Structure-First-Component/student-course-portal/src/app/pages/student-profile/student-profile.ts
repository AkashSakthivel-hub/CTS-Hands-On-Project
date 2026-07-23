import { Component } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  imports: [],
  standalone: true,
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfileComponent {
  studentName = 'Alex Morgan';
  studentId = 'STU-2026-001';
  cgpa = 3.95;
  coursesEnrolled = [
    'Angular 21 Masterclass',
    'TypeScript Deep Dive',
    'Modern Web Architecture',
    'Reactive Programming with RxJS'
  ];
}

