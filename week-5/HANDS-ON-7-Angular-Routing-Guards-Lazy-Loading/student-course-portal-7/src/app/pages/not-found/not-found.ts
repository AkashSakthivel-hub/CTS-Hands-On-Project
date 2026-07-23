import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1 class="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        
        <div class="actions">
          <button class="primary-button" (click)="goHome()">
            Go to Home
          </button>
          <button class="secondary-button" (click)="goBack()">
            Go Back
          </button>
        </div>

        <div class="routing-info">
          <h4>🔍 Wildcard Route:</h4>
          <p>This component is rendered for any unknown routes using the <code>**</code> wildcard.</p>
          <p>The wildcard route must be the <strong>last</strong> route in the configuration!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .not-found-content {
      text-align: center;
      max-width: 600px;
    }
    .error-code {
      font-size: 120px;
      font-weight: bold;
      color: #4a90e2;
      margin: 0;
      line-height: 1;
    }
    h2 {
      font-size: 32px;
      color: #333;
      margin: 20px 0 10px 0;
    }
    p {
      color: #666;
      font-size: 16px;
      margin-bottom: 30px;
    }
    .actions {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-bottom: 40px;
    }
    button {
      padding: 12px 30px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .primary-button {
      background: #4a90e2;
      color: white;
    }
    .primary-button:hover {
      background: #357abd;
      transform: translateY(-2px);
    }
    .secondary-button {
      background: #f0f0f0;
      color: #333;
    }
    .secondary-button:hover {
      background: #e0e0e0;
    }
    .routing-info {
      background: #fff3cd;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #ffc107;
      text-align: left;
    }
    .routing-info h4 {
      margin: 0 0 10px 0;
      color: #856404;
    }
    .routing-info p {
      margin: 8px 0;
      font-size: 14px;
      color: #856404;
    }
    .routing-info code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      color: #d63384;
      font-family: 'Courier New', monospace;
    }
  `]
})
export class NotFound {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    window.history.back();
  }
}
