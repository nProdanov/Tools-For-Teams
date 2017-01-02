import { Injectable } from '@angular/core'
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Notification } from '../models/notification';

@Injectable()
export class NotificationService {
  private url = 'http://localhost:3001';
  private saveUrl = 'http://localhost:3001/api/notifications';
  private name: string;
  private socket: SocketIOClient.Socket;

  constructor(private http: Http) {
    this.socket = io(this.url);
  }

  getNotification(projectName: string) {
    let observable = new Observable(observer => {
      this.socket.on(`${projectName} notification`, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  sendNotification(projectName: string, notification: Notification) {
      this.socket.emit(`${projectName} notification`, notification);
  }

  createNotificationEvent(projectName: string) {
    this.socket.emit('create notification', projectName);
  }

  saveProjectNotification(notification: Notification): Observable<any> {
    return this.http.post(this.saveUrl, notification)
      .map((response: any) => {
          let data = response.json();
          return data;
      });
  }

  getUserProjectsNotifications(username: string): Observable<any> {
    return this.http.get(`${this.saveUrl}/${username}`)
      .map((response: any) => {
          let data = response.json();
          return data;
      });
  }

  updateNotification(notification: any) {
    return this.http.put(`${this.saveUrl}/${notification._id}`, {})
      .map((response: any) => {
        let data = response.json();
        return data;
      });
  }

  updateAllNotifications(notifications: any) {
    return this.http.post(`${this.saveUrl}/all`, notifications)
      .map((response: any) => {
        let data = response.json();
        return data;
      });
  }
}