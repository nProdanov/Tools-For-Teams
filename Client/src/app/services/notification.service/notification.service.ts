import { Injectable } from '@angular/core'
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Notification } from '../../models/notification.model/notification.model';

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

  getUserNotification(username: string) {
    let observable = new Observable(observer => {
      this.socket.on(`${username} notification`, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  sendAddToProjectNotification(username: string, notification: Notification) {
    console.log("User " + username);
    this.socket.emit(`${username} notification`, notification);
  }

  sendNotification(projectName: string, notification: Notification) {
      console.log("Project " + projectName);
      this.socket.emit(`${projectName} notification`, notification);
  }

  createUserNotificationEvent(username: string) {
    this.socket.emit('create user-notification', username);
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
}