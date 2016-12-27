import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../components/page.component/page.component';
import { StorageService } from '../../services/storage.service/storage.service';

@Component({
    templateUrl: './profile.page.html'
})
export class ProfilePage implements PageComponent, OnInit {
    public profile: any;

    constructor(private storageService: StorageService) {
        this.profile = {};
    }

    ngOnInit() {
        this.storageService
            .getProfileItem()
            .subscribe(resProfile => this.profile = resProfile);
    }
}
