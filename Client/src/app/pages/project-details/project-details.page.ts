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
import { StorageService } from '../../services/storage.service/storage.service';

@Component({
    templateUrl: './project-details.page.html'
})
export class ProjectDetailsPage implements PageComponent, OnInit {
    public profile: any;
    public project: Project;
    public newTask: Task;
    public selectedUser: string;
    public users: string[];
    public userToAdd: string;

    constructor(
        private StorageService: StorageService,
        private toastr: ToastsManager,
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private userService: UserService,
        private taskService: TaskService) {
        this.profile = {};
        this.project = { creator: '', name: '', description: '', tasks: [], projectMembers: [] };
        this.newTask = { projectId: '', title: '', description: '', timeForExecution: '', cost: 0, status: '', users: [] };
    }

    ngOnInit() {
        this.StorageService
            .getProfileItem()
            .subscribe(resProfile => {
                this.profile = resProfile;

                this.route.params
                    .switchMap((params: Params) => {
                        this.newTask.projectId = params['id'];
                        return this.projectService.getProjectById(params['id'])
                    })
                    .subscribe((project: Project) => {
                        this.project = project;
                    });

                this.userService.getAllUsers().subscribe((users: any) => {
                    this.users = users;
                });
            });
    }

    addNewTask() {
        this.project.tasks.push(this.newTask);
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
            this.toastr.error('User doesnt\'t exist or is already assigned to task');
        }
    }

    addUserToProject() {
        if (this.project.projectMembers.indexOf(this.userToAdd) < 0) {
            this.projectService.addUserToProject(this.newTask.projectId, this.userToAdd)
                .subscribe((res: any) => {
                    this.project.projectMembers.push(this.userToAdd);
                    this.toastr.success('User added to project!');
                });
        }
        else {
            this.toastr.error('User already works on this project');
        }
    }
}
