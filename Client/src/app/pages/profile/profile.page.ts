import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../components/page.component/page.component';

@Component({
    templateUrl: './profile.page.html'
})
export class ProfilePage implements PageComponent, OnInit {
    public profile: any;

    constructor() {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }

    ngOnInit(){}
}
