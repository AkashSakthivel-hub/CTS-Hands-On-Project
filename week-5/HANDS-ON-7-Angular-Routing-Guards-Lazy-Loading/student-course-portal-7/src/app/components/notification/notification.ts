import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

/**
 * NotificationComponent demonstrates COMPONENT-LEVEL PROVIDER
 * 
 * WHY COMPONENT-LEVEL PROVIDING CREATES A NEW INSTANCE:
 * 
 * When you add `providers: [NotificationService]` to the @Component decorator,
 * Angular creates a NEW INSTANCE of NotificationService specifically for this component
 * and its children.
 * 
 * This is different from providedIn: 'root' which creates ONE singleton instance
 * shared across the entire application.
 * 
 * USE CASES FOR COMPONENT-LEVEL PROVIDERS:
 * 1. Isolated state per component instance (e.g., form wizard with multiple steps)
 * 2. Different configuration per component
 * 3. Testing - easier to mock component-specific services
 * 4. When you need multiple instances of the same service with different state
 * 
 * HIERARCHICAL DI:
 * - Each component has its own injector
 * - When a service is requested, Angular looks up the injector tree
 * - If service is provided at component level, that instance is used
 * - Otherwise, it continues up to parent injectors until it finds root
 */
@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  providers: [NotificationService], // Component-level provider - creates new instance
  template: `
    <div class="notification-panel">
      <h3>🔔 Notifications</h3>
      
      <div class="notification-info">
        <p><strong>Current Instance ID:</strong> This component has its own NotificationService instance</p>
        <p><strong>Notification Count:</strong> {{ notificationCount }}</p>
      </div>
      
      <div class="notification-actions">
        <button (click)="addNotification()" class="btn-add">
          + Add Notification
        </button>
        <button (click)="clearNotifications()" class="btn-clear">
          Clear All
        </button>
      </div>
      
      <div class="notifications-list">
        <div *ngFor="let notification of notifications; let i = index" class="notification-item">
          <span class="notification-index">{{ i + 1 }}</span>
          <span class="notification-text">{{ notification }}</span>
        </div>
        <div *ngIf="notifications.length === 0" class="empty-notifications">
          No notifications yet
        </div>
      </div>
      
      <div class="provider-explanation">
        <h4>📚 Component-Level Provider Explanation:</h4>
        <ul>
          <li><strong>providers: [NotificationService]</strong> in @Component creates a NEW instance</li>
          <li>This instance is scoped to this component and its children</li>
          <li>Different from <strong>providedIn: 'root'</strong> which creates ONE singleton</li>
          <li>Useful for isolated state per component instance</li>
          <li>Check console - you'll see "NotificationService instance created" each time this component is instantiated</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .notification-panel {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h3 {
      margin: 0 0 20px 0;
      color: #333;
    }
    .notification-info {
      background: #f0f8ff;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 15px;
      border-left: 4px solid #4a90e2;
    }
    .notification-info p {
      margin: 5px 0;
      font-size: 14px;
      color: #666;
    }
    .notification-info strong {
      color: #333;
    }
    .notification-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    button {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-add {
      background: #4a90e2;
      color: white;
    }
    .btn-add:hover {
      background: #357abd;
    }
    .btn-clear {
      background: #dc3545;
      color: white;
    }
    .btn-clear:hover {
      background: #c82333;
    }
    .notifications-list {
      margin-bottom: 20px;
      max-height: 200px;
      overflow-y: auto;
    }
    .notification-item {
      display: flex;
      gap: 10px;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 4px;
      margin-bottom: 8px;
      align-items: center;
    }
    .notification-index {
      background: #4a90e2;
      color: white;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      flex-shrink: 0;
    }
    .notification-text {
      flex: 1;
      color: #333;
      font-size: 14px;
    }
    .empty-notifications {
      text-align: center;
      padding: 30px;
      color: #999;
      font-style: italic;
    }
    .provider-explanation {
      background: #fff9e6;
      padding: 15px;
      border-radius: 4px;
      border-left: 4px solid #ffc107;
    }
    .provider-explanation h4 {
      margin: 0 0 10px 0;
      color: #856404;
      font-size: 14px;
    }
    .provider-explanation ul {
      margin: 0;
      padding-left: 20px;
    }
    .provider-explanation li {
      margin: 5px 0;
      font-size: 13px;
      color: #666;
      line-height: 1.5;
    }
    .provider-explanation strong {
      color: #856404;
    }
  `]
})
export class NotificationComponent implements OnInit {
  notifications: string[] = [];
  notificationCount = 0;

  constructor(private notificationService: NotificationService) {
    console.log('NotificationComponent created with its own NotificationService instance');
  }

  ngOnInit(): void {
    this.refreshNotifications();
  }

  addNotification(): void {
    const timestamp = new Date().toLocaleTimeString();
    const message = `Notification added at ${timestamp}`;
    this.notificationService.addNotification(message);
    this.refreshNotifications();
  }

  clearNotifications(): void {
    this.notificationService.clearNotifications();
    this.refreshNotifications();
  }

  private refreshNotifications(): void {
    this.notifications = this.notificationService.getNotifications();
    this.notificationCount = this.notificationService.getNotificationCount();
  }
}
