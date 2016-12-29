import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
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
import { InfiniteScroll } from 'angular2-infinite-scroll';

@Component({
    templateUrl: './project-details.page.html',
    styleUrls: ['./project-datils.page.css', './message-board.css'],
    providers: [InfiniteScroll]
})
export class ProjectDetailsPage implements PageComponent, OnInit, OnDestroy, AfterViewInit {
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
    @ViewChild('chatContent') el:ElementRef;

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

    onScrollUp() {
        console.log("scrolling");
    }

    ngOnInit() {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
        this.StorageService
            .getProfileItem()
            .subscribe(resProfile => {
                this.profile = resProfile;
                // get project with the latest ten messages
                // user profiles
                this.route.params
                    .switchMap((params: Params) => {
                        this.newTask.projectId = params['id'];
                        return this.projectService.getProjectById(params['id'])
                    })
                    .subscribe((project: Project) => {
                        this.project = project;
                        this.chatService.createEvent(this.project.name);
                        this.connection = this.chatService.getMessages(this.project.name).subscribe(message => {
                            this.messages.push(message);
                        });

                        this.projectService.getLastTenMessages(this.project.name).subscribe((response) => {
                            this.messages = response;
                        });
                    });

                this.userService.getAllUsers().subscribe((users: any) => {
                    this.users = users;
                });
            });
    }

    ngAfterViewInit() {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
    }

    messageBoardUpdate() {
        let messageToSend = {
            projectName: this.project.name,
            created: new Date(Date.now()),
            from: this.currentUser,
            message: this.message
        };

        this.projectService.saveMessage(messageToSend).subscribe(() => { });
        this.chatService.sendMessage(this.project.name, this.message, this.currentUser);
        this.message = '';
    }

    addNewTask() {
        this.taskService.saveTask(this.newTask)
            .subscribe((res: any) => {
                if (res.error) {
                    this.toastr.error(res.error);
                } else {
                    this.project.tasks.push(res);
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

    ngOnDestroy() {
        this.connection.unsubscribe();
    }
}
