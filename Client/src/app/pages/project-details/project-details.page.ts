import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PageComponent } from '../../components/page.component/page.component';
import { Project } from '../../models/project.model/project.model';
import { Task } from '../../models/task.model/task.model';
import { User } from '../../models/user.model/user.model';
import { ProjectService } from '../../services/project.service/project.service';
import { UserService } from '../../services/user.service/user.service';
import { TaskService } from '../../services/task.service/task.service';
import { ChatService } from '../../services/socket.service/socket.service';
import { ToastsManager } from 'ng2-toastr';
import { Ng2AutoComplete } from 'ng2-auto-complete';
import { StorageService } from '../../services/storage.service/storage.service';

@Component({
    templateUrl: './project-details.page.html'
})
export class ProjectDetailsPage implements PageComponent, OnInit, OnDestroy {
    public profile: any;
    public project: Project;
    public newTask: Task;
    public selectedUser: string;
    public users: string[];
    public userToAdd: string;
    public messages = [];
    public connection;
    public message;
    public currentUser;

    constructor(
        private StorageService: StorageService,
        private toastr: ToastsManager,
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private userService: UserService,
        private taskService: TaskService,
        private chatService: ChatService) {
        this.profile = {};
        this.project = { creator: '', name: '', description: '', tasks: [], projectMembers: [] };
        this.newTask = { projectId: '', title: '', description: '', timeForExecution: '', cost: 0, status: '', users: [] };
        this.StorageService.getProfileItem().subscribe(res => this.currentUser = res.username);
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
                        this.chatService.createEvent(this.project.name);
                         console.log(this.project.name);
                    });

                this.userService.getAllUsers().subscribe((users: any) => {
                    this.users = users;
                });

                console.log(this.project.name);
            });

        console.log("before get messages " + this.project.name);
        this.connection = this.chatService.getMessages(this.project.name).subscribe(message => {
            console.log(message);
            this.messages.push(message);
        });
    }

    messageBoardUpdate() {
        // this.chatService.messageBoardUpdate(this.message, this.currentUser);

        this.chatService.sendSocketMsg(this.project.name, this.message, this.currentUser);
        this.message = '';
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
            this.toastr.error('User doesnt\'t exist or is already assigned to task');
        }
    }

    addUserToProject() {
        this.projectService.addUserToProject(this.newTask.projectId, this.userToAdd)
            .subscribe((res: any) => {
                // should add validation for already existing user
                this.toastr.success('User added to project!');
            });
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }
}
