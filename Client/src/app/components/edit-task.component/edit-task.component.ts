import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service/task.service';
import { NotificationService } from '../../services/notification.service/notification.service';
import { ToastsManager } from 'ng2-toastr';
import { Task } from '../../models/task.model/task.model';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    selector: 'edit-task',
    templateUrl: './edit-task.component.html'
})
export class EditTaskModalComponent {
    @ViewChild('childModal') childModal: ModalDirective;
    @Input() modelTask: Task;
    @Input() users: string[];
    @Input() projectName: string;
    @Output() saveEvent: EventEmitter<any> = new EventEmitter();
    public selectedUser: string;
    public hours: number[];
    public isCostValid: boolean;


    constructor(private taskService: TaskService, private toastr: ToastsManager, private notificationService: NotificationService) {
        this.selectedUser = '';
        this.isCostValid = true;
        this.hours = [];
        for (let i = 2; i <= 100; i += 1) {
            this.hours.push(i);
        }
    }

    save() {
        let initialTaskTitle = this.modelTask.title;
        let currentProjectName = this.projectName;
        this.taskService.editTask(this.modelTask)
            .subscribe(res => {
                if (res.err) {
                    this.toastr.error(res.err);
                }
                else {
                    this.saveEvent.next(res);
                    this.toastr.success('Changes saved.');
                    this.notificationService.sendNotification(currentProjectName, {
                        projectName: currentProjectName,
                        content: `Task ${initialTaskTitle} has been changed to ${res.title}`,
                        created: new Date(Date.now()),
                        deleted: false
                    });
                    this.childModal.hide();
                }
            });
    }

    validateCost() {
        if (+this.modelTask.cost <= 0) {
            this.isCostValid = false;
        }
        else {
            this.isCostValid = true;
        }
    }

    addUserToTask() {
        if (this.modelTask.users.indexOf(this.selectedUser) < 0 && this.users.indexOf(this.selectedUser) >= 0) {
            this.modelTask.users.push(this.selectedUser);
            this.users.splice(this.users.indexOf(this.selectedUser), 1);
            this.selectedUser = '';
        } else {
            this.toastr.error('User doesnt\'t exist or is already assigned to task');
        }
    }

    public showChildModal(): void {
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }
}