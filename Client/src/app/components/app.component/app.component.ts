import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Auth } from '../../services/auth.service/auth.service';
import { ToastsManager } from 'ng2-toastr';
import { StorageService } from '../../services/storage.service/storage.service';
import { NewProjectPage } from '../../pages/new-project/new-project.page';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    @ViewChild(NewProjectPage) childModal: NewProjectPage
    public profile: any;

    constructor(private stroageService: StorageService, private service: Auth, public toastr: ToastsManager, public vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);
        this.profile = {};
    }

    ngOnInit() {

        this.stroageService
            .getProfileItem()
            .subscribe(resProfile => this.profile = resProfile);
    }

    showChildModal() {
        this.childModal.showChildModal();
    }
}
