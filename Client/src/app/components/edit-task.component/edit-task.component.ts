import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service/task.service';
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
    @Output() saveEvent: EventEmitter<any> = new EventEmitter();
    public selectedUser: string;

    constructor(private taskService: TaskService, private toastr: ToastsManager) {
        this.selectedUser = '';
    }

    save() {
        this.taskService.editTask(this.modelTask)
            .subscribe(res => {
                if (res.err) {
                    this.toastr.error(res.err);
                }
                else {
                    this.saveEvent.next(res);
                    this.toastr.success('Changes saved.');
                    this.childModal.hide();
                }
            });
    }

    public showChildModal(): void {
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }
}