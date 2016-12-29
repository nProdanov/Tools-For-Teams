import { Component, ViewChild, Input } from '@angular/core';
import { TaskService } from '../../services/task.service/task.service';
import { ToastsManager } from 'ng2-toastr';
import { Task } from '../../models/task.model/task.model';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    selector: 'new-task',
    templateUrl: './new-task.component.html'
})
export class NewTaskModalComponent {
    @ViewChild('childModal') public childModal: ModalDirective;
    @Input() users: string[];
    @Input() projectId: string;
    newTask: Task;
    selectedUser: string;

    constructor(private taskService: TaskService, private toastr: ToastsManager) {
        this.newTask = {
            projectId: '',
            title: '',
            description: '',
            timeForExecution: '',
            cost: 0,
            status: '',
            users: []
        };
        this.selectedUser = '';

    }

    public showChildModal(): void {
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }

    addNewTask() {
        this.newTask.projectId = this.projectId;
        this.taskService.saveTask(this.newTask)
            .subscribe((res: any) => {
                if (res.error) {
                    this.toastr.error(res.error);
                } else {
                    this.toastr.success("Task added successfully.");
                }

                this.newTask.users = [];
            });
    }

    addUserToTask() {
        if (this.newTask.users.indexOf(this.selectedUser) < 0 && this.users.indexOf(this.selectedUser) >= 0) {
            this.newTask.users.push(this.selectedUser);
            this.selectedUser = '';
        } else {
            this.toastr.error('User doesnt\'t exist or is already assigned to task');
        }
    }
}