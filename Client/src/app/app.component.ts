import { Component, ViewContainerRef, ViewChild, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Auth } from './shared/services/auth.service';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { ProjectService } from './shared/services/project.service';
import { NotificationService } from './shared/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(NewProjectComponent) childModal: NewProjectComponent;

  constructor(
    public service: Auth,
    public toastr: ToastsManager,
    public vRef: ViewContainerRef,
    public projectService: ProjectService,
    public notificationService: NotificationService) {
    this.toastr.setRootViewContainerRef(vRef);
    this.projectService.getAllProjects()
      .subscribe((projects: any) => {
        projects.forEach((project: any) => {
          this.notificationService.createNotificationEvent(project.name);
          this.notificationService.getNotification(project.name).subscribe((notification: any) => {
            this.toastr.info(notification.content);
            this.notificationService.saveProjectNotification(notification).subscribe();
          });
        });
      })
  }

  showChildModal() {
    this.childModal.showChildModal();
  }
}
