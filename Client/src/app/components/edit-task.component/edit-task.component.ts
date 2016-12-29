import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Task } from '../../models/task.model/task.model';
import { Ng2AutoComplete } from 'ng2-auto-complete';

@Component({
    selector: 'edit-task',
    templateUrl: './edit-task.component.html'
})
export class EditTaskComponent {
    public dataItem;
    public selectedUser: string;
    public members;

    @Input() public set model(task: Task) {
        this.dataItem = task;
        task === undefined ? this.active = false : this.active = true;
        console.log(this.active);
    }
    @Input() public set projectMembers(users: any){
        this.members = users;
    }
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    public active: boolean = false;

    public onSave(): void {
        this.save.emit(this.dataItem);
        this.active = false;
        console.log(this.active);
    }
    public onCancel(): void {
        this.active = false;
        this.cancel.emit(undefined);
    }

    addUserToTask() {
        this.dataItem.users.push(this.selectedUser);
        this.selectedUser = '';
    }
}
