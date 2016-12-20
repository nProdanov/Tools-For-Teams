import { Component } from '@angular/core';
import { PageComponent } from '../../components/page.component/page.component';

@Component({
    moduleId: module.id,
    templateUrl: './profile.page.html'
})
export class ProfilePage implements PageComponent {
    public profile: any;

    constructor() {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }

    ngOnInit() {
    }
}
