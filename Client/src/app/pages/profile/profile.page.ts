import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../components/page.component/page.component';
import { StorageService } from '../../services/storage.service/storage.service';
import { UserService } from '../../services/user.service/user.service';

@Component({
    templateUrl: './profile.page.html'
})
export class ProfilePage implements PageComponent, OnInit {
    public profile: any;

    constructor(
        private storageService: StorageService,
        private userService: UserService) {
        this.profile = {};
    }

    ngOnInit() {
        this.storageService
            .getProfileItem()
            .subscribe(resProfile => {
                this.profile.picture = resProfile.picture;
                this.userService.getUserById(resProfile.id)
                    .subscribe(user => {
                        this.profile.username = user.username;
                        this.profile.firstName = user.firstName;
                        this.profile.lastName = user.lastName;
                        this.profile.gender = user.gender;
                        this.profile.email = user.email;
                        this.profile.company = user.company;
                    });;
            })

    }
}
