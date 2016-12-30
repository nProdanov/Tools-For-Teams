import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { ProjectService } from '../../services/project.service/project.service';
import { NotificationService } from '../../services/notification.service/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private projectService: ProjectService, private notificationService: NotificationService, public toastr: ToastsManager, public vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);
        this.projectService.getAllProjects()
            .subscribe((projects: any) => {
                console.log(projects);
                projects.forEach((project: any) => {
                    this.notificationService.createNotificationEvent(project.name);
                    this.notificationService.getNotification(project.name).subscribe((notification: any) => {
                        this.toastr.info(notification.content);
                        this.notificationService.saveProjectNotification(notification).subscribe();
                    });
                });
            })
    }
}
