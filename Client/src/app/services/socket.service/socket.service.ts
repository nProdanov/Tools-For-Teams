import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatService {
  private url = 'http://localhost:3001';
  private name: string;
  private socket: SocketIOClient.Socket;

  sendMessage(message) {
    this.socket.emit('chat message', message);
  }

  getMessages() {
      let observable = new Observable(observer => {
        this.socket = io(this.url);
        this.socket.on('chat', (data) => {
          observer.next(data);    
        });
        return () => {
          this.socket.disconnect();
        };  
      })     
      return observable;
  }

  sendSocketMsg(projectName: string, message: string) {
    this.socket.emit(projectName, message);
  }

  createEvent(projectName: string) {
    this.socket.emit('create event', projectName);
  }
  // get(name: string): Observable<any> {
  //       this.name = name;
  //       let socketUrl = this.url;
  //       this.socket = io.connect(socketUrl);
  //       this.socket.on("connect", () => this.connect());
  //       this.socket.on("disconnect", () => this.disconnect());
  //       this.socket.on("error", (error: string) => {
  //           console.log(`ERROR: "${error}" (${socketUrl})`);
  //       });

  //       // Return observable which follows "create" and "remove" signals from socket stream
  //       return Observable.create((observer: any) => {
  //           this.socket.on("create", (item: any) => observer.next({ action: "create", item: item }) );
  //           this.socket.on("remove", (item: any) => observer.next({ action: "remove", item: item }) );
  //           return () => this.socket.close();
  //       });
  //   }

    get(name: string) {
      this.socket = io(this.url);
        this.socket.emit('get', name);
    }
}