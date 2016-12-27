import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/socket.service/socket.service';

@Component({
    selector: "message-board",
    templateUrl: "./message-board.component.html",
    providers: [ChatService]
})
export class MessageBoardComponent implements OnInit, OnDestroy {
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
