import { Component, OnInit } from '@angular/core';
import { Auth } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';

@Component({
    templateUrl: './register.html',
    styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {
    private users: string[];
    userToRegister: any;
    isUsernameValid: boolean;
    confirmPassword: string;
    arePasswordsSame: boolean;
    passwordType: string;
    genders: any[];

    constructor(private auth: Auth, private userService: UserService) {
        this.userToRegister = {};
        this.isUsernameValid = false;
        this.users = [];
        this.confirmPassword = '';
        this.arePasswordsSame = false;
        this.passwordType = 'password';
        this.genders = [
            { value: 'f', display: 'Female' },
            { value: 'm', display: 'Male' }
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

    register() {
        this.auth.signUp(this.userToRegister);
    }
};
