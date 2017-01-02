import { Component, OnInit } from '@angular/core';
import { Project } from '../../shared/models/project';
import { ProjectService } from '../../shared/services/project.service';
import { Router } from '@angular/router';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { StorageService } from '../../shared/services/storage.service';
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './my-projects.html',
    styleUrls: ['./my-projects.css']
})
export class MyProjectsComponent implements OnInit {
    public notificationCount = 0;
    public notifications: any[];
    public profile: any;
    public projects: any[];
    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
    private pageSize: number = 10;
    private skip: number = 0;

    constructor(
        private userService: UserService,
        private storageService: StorageService,
        private router: Router,
        private projectService: ProjectService,
        private notificationService: NotificationService) {
        this.profile = {};
    }

    ngOnInit() {
        this.storageService
            .getProfileItem()
            .subscribe(resProfile => {
                this.profile = resProfile;
                this.userService
                    .getUserById(this.profile.id)
                    .subscribe(resUser => {
                        let projectsObservables: Observable<any>[] = [];
                        resUser.projects.forEach(proj => {
                            projectsObservables.push(this.projectService.getMappedProjectById(proj.id));
                        });

                        Observable
                            .forkJoin(...projectsObservables)
                            .subscribe(data => {
                                this.projects = data;
                                this.gridView = {
                                    data: this.projects.slice(this.skip, this.skip + this.pageSize),
                                    total: this.projects.length
                                }
                            });
                    });
            });

        this.notificationService.getUserProjectsNotifications(this.profile.username)
            .subscribe((notifications: any) => {
                this.notificationCount = notifications.length;
                this.notifications = notifications;
            });
    }

    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadProjects();
    }

    protected pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.pageSizeProjects();
    }

    private pageSizeProjects(): void {
        this.gridView = {
            data: this.projects.slice(this.skip, this.skip + this.pageSize),
            total: this.projects.length
        };
    }

    private onSelect(e) {
        this.router.navigateByUrl(`/project-details/${this.gridView.data[e.index % this.pageSize]._id}`);
    }

    private loadProjects(): void {
        this.gridView = {
            data: orderBy(this.projects, this.sort),
            total: this.projects.length
        };
    }

    private deleteAllNotifications() {
        this.notificationService.updateAllNotifications(this.notifications)
            .subscribe(() => {
                this.notifications = [];
                this.notificationCount = 0;
            });
    }

    private deleteNotification(index: any) {
        let notification = this.notifications[index];
        this.notificationService.updateNotification(notification)
            .subscribe(() => {
                this.notifications.splice(index, 1);
                this.notificationCount -= 1;
            });
    }
}
