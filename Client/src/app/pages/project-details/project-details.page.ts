import {
    Component,
    ElementRef,
    OnInit,
    OnDestroy,
    ViewChild,
    AfterViewChecked,
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PageComponent } from '../../components/page.component/page.component';
import { Project } from '../../models/project.model/project.model';
import { Task } from '../../models/task.model/task.model';
import { User } from '../../models/user.model/user.model';
import { ProjectService } from '../../services/project.service/project.service';
import { UserService } from '../../services/user.service/user.service';
import { TaskService } from '../../services/task.service/task.service';
import { ChatService } from '../../services/chat.service/chat.service';
import { NotificationService } from '../../services/notification.service/notification.service';
import { ToastsManager } from 'ng2-toastr';
import { Ng2AutoComplete } from 'ng2-auto-complete';
import { StorageService } from '../../services/storage.service/storage.service';
import { NewTaskModalComponent } from '../../components/new-task.component/new-task.component';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { EditTaskModalComponent } from '../../components/edit-task.component/edit-task.component';

@Component({
    templateUrl: './project-details.page.html',
    styleUrls: [
        './project-datils.page.css',
        './message-board.css'],
    animations: [
        trigger('movePanel', [
            state('inactive', style({
                opacity: 0,
                zIndex: -1
            })),
            state('active', style({
                opacity: 1,
                zIndex: 999
            })),
            transition('inactive => active', [
                animate(600, keyframes([
                    style({ opacity: 0, transform: 'translateX(-200px)', offset: 1 }),
                    style({ opacity: 1, transform: 'translateX(200px)', offset: .75 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                ]))
            ]),
            transition('active => inactive', [
                animate(600, keyframes([
                    style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(25px)', offset: .75 }),
                    style({ opacity: 0, transform: 'translateX(-200px)', offset: 1 }),
                ]))
            ])
        ]),
        trigger('slideInOut', [
            state('in', style({
                transform: 'translate3d(0, 0, 0)'
            })),
            state('out', style({
                transform: 'translate3d(100%, 0, 0)'
            })),
            transition('in => out', animate('400ms ease-in-out')),
            transition('out => in', animate('400ms ease-in-out'))
        ]),
    ]
})
export class ProjectDetailsPage implements PageComponent, OnInit, OnDestroy, AfterViewChecked {
    @ViewChild(NewTaskModalComponent) childModal: NewTaskModalComponent;
    @ViewChild('chatContent') private el: ElementRef;
    @ViewChild(EditTaskModalComponent) editModal: EditTaskModalComponent;

    public profile: any;
    public project: Project;
    public projectId: string;
    public selectedUser: string;
    public users: string[];
    public userToAdd: string;
    public messages = [];
    public connection;
    public message;
    public currentUser;
    private gridView: GridDataResult;
    private pageSize: number = 10;
    private skip: number = 0;
    public dataItem: Task;
    public state: string = 'inactive';
    public menuState: string = 'out';

    constructor(
        private StorageService: StorageService,
        private toastr: ToastsManager,
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private userService: UserService,
        private taskService: TaskService,
        private chatService: ChatService,
        private notificationService: NotificationService) {
        this.profile = {};
        this.project = { creator: '', name: '', description: '', tasks: [], projectMembers: [] };
        this.dataItem = {
            _id: '',
            projectId: '',
            title: '',
            description: '',
            timeForExecution: '1',
            cost: 1,
            status: 'started',
            users: []
        };
        this.StorageService.getProfileItem().subscribe(res => this.currentUser = res.username);
    }

    ngOnInit() {
        this.StorageService
            .getProfileItem()
            .subscribe(resProfile => {
                this.profile = resProfile;
                // user profiles
                this.route.params
                    .switchMap((params: Params) => {
                        this.projectId = params['id'];
                        return this.projectService.getProjectById(params['id'])
                    })
                    .subscribe((project: Project) => {
                        this.project = project;
                        this.chatService.createEvent(this.project.name);
                        this.connection = this.chatService.getMessages(this.project.name).subscribe(message => {
                            this.messages.push(message);
                        });

                        this.projectService.getTenMessages(this.project.name).subscribe((response) => {
                            this.messages = response;
                        });

                        this.gridView = {
                            data: this.project.tasks.slice(this.skip, this.skip + this.pageSize),
                            total: this.project.tasks.length
                        };
                    });

                this.userService.getAllUsers().subscribe((users: any) => {
                    this.users = users;
                });
            });
    }

    toggleMenu() {
        this.menuState = this.menuState === 'out' ? 'in' : 'out';
    }

    toggleMove() {
        this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    }

    showChildModal() {
        this.childModal.showChildModal();
    }

    showTestModal(data: Task) {
        this.dataItem = data;
        this.editModal.showChildModal();
    }

    ngAfterViewChecked() {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
    }

    protected pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.pageSizeProjects();
    }

    private pageSizeProjects(): void {
        this.gridView = {
            data: this.project.tasks.slice(this.skip, this.skip + this.pageSize),
            total: this.project.tasks.length
        };
    }

    messageBoardUpdate() {
        let messageToSend = {
            projectName: this.project.name,
            created: new Date(Date.now()),
            from: this.currentUser,
            message: this.message,
            picture: this.profile.picture
        };

        this.projectService.saveMessage(messageToSend).subscribe(() => { });
        this.chatService.sendMessage(this.project.name, messageToSend);
        this.message = '';
    }

    addUserToProject() {
        if (this.project.projectMembers.indexOf(this.userToAdd) < 0) {
            this.projectService.addUserToProject(this.projectId, this.userToAdd)
                .subscribe((res: any) => {
                    this.project.projectMembers.push(this.userToAdd);
                    this.toastr.success('User added to project!');
                });

            this.notificationService.sendNotification(this.project.name, {
                projectName: this.project.name,
                content: `${this.userToAdd} has been added to project ${this.project.name}.`,
                created: new Date(Date.now())
            });
            this.userToAdd = '';
        }
        else {
            this.toastr.error('User already works on this project');
        }
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }

    addToTasks(task) {
        this.project.tasks.push(task);
    }
}
