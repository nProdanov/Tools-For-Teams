import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Notification } from '../../models/notification.model/notification.model';

export class NotificationService {
  private url = 'http://localhost:3001';
  private name: string;
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io(this.url);
  }

  getNotification() {
    let observable = new Observable(observer => {
      this.socket.on("notification", (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  sendNotification(notification: Notification) {
      this.socket.emit("notification", notification);
  }
}