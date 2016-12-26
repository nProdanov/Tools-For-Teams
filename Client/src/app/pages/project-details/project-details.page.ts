import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PageComponent } from '../../components/page.component/page.component';
import { Project } from '../../models/project.model/project.model';
import { Task } from '../../models/task.model/task.model';
import { User } from '../../models/user.model/user.model';
import { ProjectService } from '../../services/project.service/project.service';
import { UserService } from '../../services/user.service/user.service';
import { TaskService } from '../../services/task.service/task.service';
import { ToastsManager } from 'ng2-toastr';
import { Ng2AutoComplete } from 'ng2-auto-complete';

@Component({
    templateUrl: './project-details.page.html'
})
export class ProjectDetailsPage implements PageComponent, OnInit {
    public profile: any;
    public project: Project;
    public newTask: Task;
    public selectedUser: string;
    public users: string[];

    constructor(
        private toastr: ToastsManager,
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private userService: UserService,
        private taskService: TaskService) {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.project = { creator: '', name: '', description: '', tasks: [], users: [] };
        this.newTask = { projectId: '', title: '', description: '', timeForExecution: '', cost: 0, status: '', users: [] };
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                this.newTask.projectId = params['id'];
                return this.projectService.getProjectById(params['id'])
            })
            .subscribe((project: Project) => {
                this.project = project;
                this.project.users = [];
                this.project.users.push(this.profile.username);
                this.project.tasks = [];
            });

        this.userService.getAllUsers().subscribe((users: any) => {
            this.users = users;
        });
    }

    addNewTask() {
        this.taskService.saveTask(this.newTask)
            .subscribe((res: any) => {
                if (res.error) {
                    this.toastr.error(res.error);
                } else {
                    this.toastr.success(res.message);
                }

                this.newTask.users = [];
            });
    }

    addUserToTask() {
        if (this.newTask.users.indexOf(this.selectedUser) < 0 && this.users.indexOf(this.selectedUser) >= 0) {
            this.newTask.users.push(this.selectedUser);
            this.selectedUser = '';
        } else {
            this.toastr.error("User doesnt't exist or is already assigned to task");
        }
    }
}
