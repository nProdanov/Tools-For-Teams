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
        var _this = this;
        this.router = router;
        this.lock = new Auth0Lock('56NEm0h7x2Z2leD37lBXdwAoWlHWtK2M', 'somename.eu.auth0.com', {
            additionalSignUpFields: [{
                    name: 'isManager',
                    placeholder: 'false'
                }]
        });
        this.lock.on('authenticated', function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            _this.lock.getProfile(authResult.idToken, function (error, profile) {
                if (error) {
                    console.log(error);
                }
                localStorage.setItem('profile', JSON.stringify(profile));
            });
            _this.lock.hide();
        });
    }
    Auth.prototype.login = function () {
        this.lock.show();
    };
    Auth.prototype.authenticated = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    Auth.prototype.logout = function () {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.router.navigateByUrl('/profile');
    };
    Auth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.service.js.map