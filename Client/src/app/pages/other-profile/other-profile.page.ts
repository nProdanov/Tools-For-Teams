import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PageComponent } from '../../components/page.component/page.component';
import { UserService } from '../../services/user.service/user.service';
import { User } from '../../models/user.model/user.model';

@Component({
    templateUrl: './other-profile.page.html',
    styleUrls: ['./other-profile.page.css']
})
export class OtherProfilePage implements PageComponent, OnInit {
    public profile: User;

    constructor(private userService: UserService, private route: ActivatedRoute) {
        this.profile = {
            id: '',
            username: '',
            firstName: '',
            lastName: '',
            company: '',
            email: '',
            gender: '',
            picture: ''
        };
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                let username = params['username'];
                return this.userService.getUserByUsername(username);
            })
            .subscribe((user: User) => {
                this.profile = user;
            });
    }
}
