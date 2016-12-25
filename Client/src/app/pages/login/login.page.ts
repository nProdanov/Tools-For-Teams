import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service/auth.service';

@Component({
    templateUrl: './login.page.html'
})
export class LoginPage {
    constructor(private auth: Auth) {
    }
};
