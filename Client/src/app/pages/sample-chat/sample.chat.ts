import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/socket.service/socket.service';

@Component({
    template: `<div *ngFor="let message of messages">
                     {{message.text}}
                   </div>
                   <input [(ngModel)]="message"  /><button (click)="sendMessage()">Send</button>`,
    providers: [ChatService]
})
export class ChatPage implements OnInit, OnDestroy {
    messages = [];
    connection;
    message;

    constructor(private chatService: ChatService) { }

    sendMessage() {
        this.chatService.sendMessage(this.message);
        this.message = '';
    }

    ngOnInit() {
        this.connection = this.chatService.getMessages().subscribe(message => {
            this.messages.push(message);
        })
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }
}
