import { Component } from "@angular/core";

import * as io from "./../../../../node_modules/socket.io/lib/socket.js";

import "/socket.io/socket.io.js";


@Component({
    selector: "message-board",
    templateUrl: "./message-board.component.html"
})

export class MessageBoardComponent {
    constructor (){}
}