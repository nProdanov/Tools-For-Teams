import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { ChatService } from '../../services/socket.service/socket.service';
import { StorageService } from './../../services/storage.service/storage.service';

@Component({
    selector: "message-board",
    templateUrl: "./message-board.component.html"
})
export class MessageBoardComponent implements OnInit, OnDestroy {
    messages = [];
    connection;
    message;
    currentUser;
    @Input() projectName;
    messageDate: Date;

    constructor(private chatService: ChatService, private storageService: StorageService, public elRef: ElementRef) {
        this.storageService.getProfileItem().subscribe(res => this.currentUser = res.username);
    }

    messageBoardUpdate() {
        // this.chatService.messageBoardUpdate(this.message, this.currentUser);

        this.chatService.sendSocketMsg(this.projectName, this.message, this.currentUser);
        this.messageDate = new Date();
        this.chatService.messageBoardUpdate(this.message, this.currentUser, this.messageDate);
        this.message = '';
        this.messageDate = null;
    }

    ngOnInit() {
        this.connection = this.chatService.getMessages('Test').subscribe(message => {
            this.messages.push(message);
        });
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }
}
