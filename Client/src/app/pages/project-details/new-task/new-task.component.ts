import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../../shared/services/task.service';
import { ToastsManager } from 'ng2-toastr';
import { Task } from '../../../shared/models/task';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    selector: 'new-task',
    templateUrl: './new-task.html',
    styleUrls: ['./new-task.css']
})
export class NewTaskModalComponent {
    @ViewChild('childModal') public childModal: ModalDirective;
    @Input() users: string[];
    @Input() projectId: string;
    @Output() onSaveTask: EventEmitter<any> = new EventEmitter();
    newTask: Task;
    selectedUser: string;
    hours: number[];
    isCostValid: boolean;
    disabled: boolean = false;
    status: { isopen: boolean } = { isopen: false };
    items: number[];
    availableUsers: string[];

    constructor(private taskService: TaskService, private toastr: ToastsManager) {
        this.newTask = {
            _id: '',
            projectId: '',
            title: '',
            description: '',
            timeForExecution: '1',
            cost: 1,
            status: 'started',
            users: []
        };
        this.isCostValid = true;
        this.selectedUser = '';
        this.items = [];
        for (let i = 2; i <= 100; i += 1) {
            this.items.push(i);
        }
        this.availableUsers = [];
    }

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    public showChildModal(): void {
        this.users.forEach(u => {
            this.availableUsers.push(u);
        });

        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }

    validateCost() {
        if (+this.newTask.cost <= 0) {
            this.isCostValid = false;
        }
        else {
            this.isCostValid = true;
        }
    }

    addNewTask() {
        this.newTask.projectId = this.projectId;
        this.taskService.saveTask(this.newTask)
            .subscribe((res: any) => {
                if (res.error) {
                    this.toastr.error(res.error);
                } else {
                    this.toastr.success("Task added successfully.");
                    this.onSaveTask.next(res);
                }

                this.availableUsers = [];

                this.newTask = {
                    _id: '',
                    projectId: '',
                    title: '',
                    description: '',
                    timeForExecution: '1',
                    cost: 1,
                    status: 'started',
                    users: []
                };
            });
    }

    addUserToTask() {
        if (this.newTask.users.indexOf(this.selectedUser) < 0 && this.users.indexOf(this.selectedUser) >= 0) {
            this.newTask.users.push(this.selectedUser);
            this.availableUsers.splice(this.availableUsers.indexOf(this.selectedUser), 1);
            this.selectedUser = '';
        } else {
            this.toastr.error('User doesnt\'t exist or is already assigned to task');
        }
    }
}