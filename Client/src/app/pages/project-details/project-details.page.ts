import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PageComponent } from '../../components/page.component/page.component';
import { Project } from '../../models/project.model/project.model';
import { Task } from '../../models/task.model/task.model';
import { User } from '../../models/user.model/user.model';
import { ProjectService } from '../../services/project.service/project.service';
import { UserService } from '../../services/user.service/user.service';
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
    public users: User[];

    constructor(
        private toastr: ToastsManager,
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private userService: UserService) {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.project = { creator: '', name: '', description: '', tasks: [], users: [] };
        this.newTask = { title: '', description: '', timeForExecution: '', cost: 0, status: '', users: [] };
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.projectService.getProjectById(params['id']))
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

    addNewTask(e) {
        console.log(this.newTask);
    }
}
