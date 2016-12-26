import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth.service/auth.service';
import { User } from '../../models/user.model/user.model';
import { UserService } from '../../services/user.service/user.service';

@Component({
    templateUrl: './register.page.html'
})
export class RegisterPage implements OnInit {
    private users: string[];
    userToRegister: any;
    isUsernameValid: boolean;
    confirmPassword: string;
    arePasswordsSame: boolean;
    passwordType: string;
    genders: any[];

    constructor(private auth: Auth, private userService: UserService) {
        this.userToRegister = { username: '' };
        this.isUsernameValid = false;
        this.users = [];
        this.confirmPassword = '';
        this.arePasswordsSame = false;
        this.passwordType = 'password';
        this.genders = [
            { value: 'female', display: 'Female' },
            { value: 'male', display: 'Male' }
        ];
    }

    ngOnInit() {
        this.userService.getAllUsers().subscribe((resUsers: string[]) => this.users = resUsers);
    }

    checkForUsername() {
        if (this.users.indexOf(this.userToRegister.username) < 0) {
            this.isUsernameValid = true;
        }
        else {
            this.isUsernameValid = false;
        }
    }

    checkPasswords() {
        if (this.userToRegister.password === this.confirmPassword) {
            this.arePasswordsSame = true;
        }
        else {
            this.arePasswordsSame = false;
        }
    }

    togglePassVisibility() {
        if (this.passwordType === 'password') {
            this.passwordType = 'text';
        }
        else {
            this.passwordType = 'password';
        }
    }

    register(){
        this.auth.signUp(this.userToRegister);
    }
};
