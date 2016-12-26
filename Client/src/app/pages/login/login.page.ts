import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service/auth.service';

@Component({
    templateUrl: './login.page.html'
})
export class LoginPage {
    model: any;
    passwordType: string;

    constructor(private auth: Auth) {
        this.model = {};
        this.passwordType = 'password';
    }

    login() {
        this.auth.login(this.model);
    }

    loginGoogle() {
        this.auth.googleLogin();
    }

    togglePassVisibility() {
        if (this.passwordType === 'password') {
            this.passwordType = 'text';
        }
        else {
            this.passwordType = 'password';
        }
    }
};

