import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  coursesAvailable = 15;
  coursesEnrolled = 5;
  cgpa = 8.15;
}

