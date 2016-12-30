import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../components/page.component/page.component';
import { StorageService } from '../../services/storage.service/storage.service';
import { UserService } from '../../services/user.service/user.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
    templateUrl: './profile.page.html'
})
export class ProfilePage implements PageComponent, OnInit {
    public profile: any;
    public editModel: any;
    public hiddenEdit: boolean;

    constructor(
        private storageService: StorageService,
        private userService: UserService,
        private toastr: ToastsManager) {
        this.profile = {};
        this.editModel = {};
        this.hiddenEdit = true;
    }

    toggleEdit() {
        this.hiddenEdit = !this.hiddenEdit;
    }

    save() {
        this.userService.editUser(this.editModel)
            .subscribe((res) => {
                if (res.err) {
                    this.toastr.error(res.err);
                }
                else {
                    this.toastr.success('User data saved.');
                    this.mapUser(res);
                }
            });
    }

    ngOnInit() {
        this.storageService
            .getProfileItem()
            .subscribe(resProfile => {
                this.profile.picture = resProfile.picture;
                this.userService.getUserById(resProfile.id)
                    .subscribe(user => {
                        this.mapUser(user);
                    });
            });
    }

    private mapUser(user) {
        this.profile.username = user.username;
        this.profile.firstName = user.firstName;
        this.profile.lastName = user.lastName;
        this.profile.gender = user.gender;
        this.profile.email = user.email;
        this.profile.company = user.company;

        this.editModel = {
            firstName: this.profile.firstName,
            lastName: this.profile.lastName,
            company: this.profile.company,
            id: user.id
        };
    }
}
