import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../components/page.component/page.component';
import { StorageService } from '../../services/storage.service/storage.service';
import { UserService } from '../../services/user.service/user.service';

@Component({
    templateUrl: './my-toolbox.page.html',
    styleUrls: ['./my-toolbox.page.css']
})
export class ToolboxPage implements PageComponent, OnInit {
    private profile: any;
    private projects: any[];

    constructor(private storageService: StorageService, private userService: UserService) {
        this.projects = [];
        this.profile = {};
    }

    ngOnInit() {
        this.storageService
            .getProfileItem()
            .subscribe(resProfile => {
                this.profile = resProfile;
                this.userService.getUserById(this.profile.id)
                    .subscribe(user => {
                        this.projects = user.projects;
                        console.log(user);
                        console.log(this.projects);
                    });
            });
    }
}