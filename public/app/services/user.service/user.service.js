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
require('rxjs/add/operator/map');
var http_1 = require('@angular/http');
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.projectUrl = '/api/users';
    }
    UserService.prototype.saveUser = function (body) {
        return this.http.post(this.projectUrl, body).map(function (response) {
            var data = response.json();
            return data;
        });
    };
    UserService.prototype.getUserById = function (id) {
        var url = this.projectUrl + "/" + id;
        return this
            .http
            .get(url)
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    UserService.prototype.addProject = function (userId, projectId, projectName) {
        var url = this.projectUrl + "/" + userId + "/projects";
        var body = { projectId: projectId, projectName: projectName };
        return this
            .http
            .post(url, body)
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
;
//# sourceMappingURL=user.service.js.map