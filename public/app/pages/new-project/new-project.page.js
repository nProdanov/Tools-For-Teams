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
var project_service_1 = require('../../services/project.service/project.service');
var NewProjectPage = (function () {
    function NewProjectPage(service) {
        this.service = service;
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    NewProjectPage.prototype.ngOnInit = function () {
        this.project = {
            creator: '',
            name: '',
            description: ''
        };
        this.project.creator = this.profile.nickname;
    };
    NewProjectPage.prototype.saveProject = function () {
        this.service.saveProject(this.project).subscribe(function (res) {
            console.log(res);
        });
    };
    NewProjectPage = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './new-project.page.html'
        }), 
        __metadata('design:paramtypes', [project_service_1.ProjectService])
    ], NewProjectPage);
    return NewProjectPage;
}());
exports.NewProjectPage = NewProjectPage;
//# sourceMappingURL=new-project.page.js.map