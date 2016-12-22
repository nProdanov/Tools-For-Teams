import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: './login.page.html'
})
export class LoginPage {
    constructor(private auth: Auth) { 
        console.log('here');
    }
};