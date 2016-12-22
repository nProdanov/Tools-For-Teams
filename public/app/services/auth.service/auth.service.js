"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angular2_jwt_1 = require('angular2-jwt');
var router_1 = require('@angular/router');
var Auth = (function () {
    function Auth(router) {
        this.auth0 = new Auth0({
            domain: 'toolsforteams.eu.auth0.com',
            clientID: 'wFe7CwezBHRXTHI7ZTCK3Jp7x4PWLqrK',
            responseType: 'token',
            callbackURL: 'http://localhost:3001/login-callback'
        });
        this.router = router;
        var result = this.auth0.parseHash(window.location.hash);
        if (result && result.idToken) {
            localStorage.setItem('id_token', result.idToken);
            this.auth0.getProfile(result.idToken, function (err, profile) {
                if (err) {
                    console.log(err);
                }
                var id = profile.user_id;
            });
        }
        else if (result && result.error) {
            alert('error: ' + result.error);
        }
    }
    Auth.prototype.login = function (username, password) {
        this.auth0.login({
            connection: 'Username-Password-Authentication',
            responseType: 'token',
            email: username,
            password: password,
        }, function (err) {
            if (err)
                alert("something went wrong: " + err.message);
        });
    };
    Auth.prototype.googleLogin = function () {
        this.auth0.login({
            connection: 'google-oauth2'
        }, function (err) {
            if (err)
                alert("something went wrong: " + err.message);
        });
    };
    Auth.prototype.signUp = function (username, password) {
        this.auth0.signup({
            connection: 'Username-Password-Authentication',
            responseType: 'token',
            email: username,
            password: password,
        }, function (err, profile) {
            if (err) {
                alert("something went wrong: " + err.message);
            }
            console.log(profile);
        });
    };
    ;
    Auth.prototype.logout = function () {
        console.log('here');
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.router.navigateByUrl('/');
    };
    Auth.prototype.authenticated = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    Auth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.service.js.map