import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';

@Component({
    templateUrl: './other-profile.html',
    styleUrls: ['./other-profile.css']
})
export class OtherProfileComponent implements  OnInit {
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
