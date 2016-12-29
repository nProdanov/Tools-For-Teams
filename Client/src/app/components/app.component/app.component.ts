import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Auth } from '../../services/auth.service/auth.service';
import { ToastsManager } from 'ng2-toastr';
import { StorageService } from '../../services/storage.service/storage.service';
import { NotificationService } from '../../services/notification.service/notification.service';
import { NewProjectPage } from '../../pages/new-project/new-project.page';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild(NewProjectPage) childModal: NewProjectPage
    public profile: any;
    public connection: any;

    constructor(
        private stroageService: StorageService,
        private service: Auth,
        private notificationService: NotificationService,
        public toastr: ToastsManager,
        public vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);
    }

    ngOnInit() {
        this.stroageService
            .getProfileItem()
            .subscribe(resProfile => this.profile = resProfile);
        
        this.connection = this.notificationService.getNotification().subscribe((notification: any) => { console.log(notification)});
    }

    showChildModal() {
        this.childModal.showChildModal();
    }
}
