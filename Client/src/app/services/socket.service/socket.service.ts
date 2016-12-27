import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatService {
  private url = 'http://localhost:3001';
  private name: string;
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io(this.url);
  }

  getMessages(projectName: string) {
    let observable = new Observable(observer => {
      this.socket.on(projectName, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  sendMessage(projectName: string, message: string, userName: string) {
    this.socket.emit(projectName, message, userName);
  }

  createEvent(projectName: string) {
    this.socket.emit('create event', projectName);
  }
}