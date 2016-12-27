import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/socket.service/socket.service';
import { StorageService } from './../../services/storage.service/storage.service';

@Component({
    selector: "message-board",
    templateUrl: "./message-board.component.html",
    providers: [ChatService]
})
export class MessageBoardComponent implements OnInit, OnDestroy {
    messages = [];
    connection;
    message;
    currentUser;

    constructor(private chatService: ChatService, private storageService: StorageService) { 
        this.storageService.getProfileItem().subscribe(res => this.currentUser = res.username);
    }

    messageBoardUpdate() {
        this.chatService.messageBoardUpdate(this.message, this.currentUser);
        this.message = '';
    }

    ngOnInit() {
        this.connection = this.chatService.getMessageBoard().subscribe(message => {
            this.messages.push(message);
        })
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }
}
