import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Auth } from '../../services/auth.service/auth.service';
import { StorageService } from '../../services/storage.service/storage.service';
import { NewProjectPage } from '../../pages/new-project/new-project.page';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    @ViewChild(NewProjectPage) childModal: NewProjectPage
    public profile: any;
    public connection: any;

    constructor(private stroageService: StorageService, private service: Auth) {
    }

    ngOnInit() {
        this.stroageService
            .getProfileItem()
            .subscribe((resProfile: any) => {
                this.profile = resProfile;
            });
    }

    showChildModal() {
        this.childModal.showChildModal();
    }
}
