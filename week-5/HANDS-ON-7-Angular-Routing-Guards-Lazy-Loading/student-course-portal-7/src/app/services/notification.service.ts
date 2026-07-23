import { Injectable } from '@angular/core';

/**
 * NotificationService - Component-scoped notification service
 * 
 * COMPONENT-LEVEL PROVIDER:
 * When provided at component level using providers: [NotificationService],
 * a NEW instance is created for each component instance.
 * This is useful for isolated state per component.
 * 
 * ROOT-LEVEL vs COMPONENT-LEVEL:
 * - providedIn: 'root' → One singleton instance for entire app
 * - providers: [Service] in component → New instance per component
 */
@Injectable()
export class NotificationService {
  private notifications: string[] = [];

  constructor() {
    console.log('NotificationService instance created');
  }

  addNotification(message: string): void {
    this.notifications.push(message);
    console.log('Notification added:', message);
  }

  getNotifications(): string[] {
    return this.notifications;
  }

  clearNotifications(): void {
    this.notifications = [];
  }

  getNotificationCount(): number {
    return this.notifications.length;
  }
}
