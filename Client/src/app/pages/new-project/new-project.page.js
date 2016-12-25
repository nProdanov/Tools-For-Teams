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
var user_service_1 = require('../../services/user.service/user.service');
var NewProjectPage = (function () {
    function NewProjectPage(projectService, userService) {
        this.projectService = projectService;
        this.userService = userService;
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    NewProjectPage.prototype.ngOnInit = function () {
        this.project = {
            creator: '',
            name: '',
            description: ''
        };
        this.project.creator = this.profile.username;
    };
    NewProjectPage.prototype.saveProject = function () {
        var _this = this;
        this.projectService.saveProject(this.project).subscribe(function (resProject) {
            _this.userService
                .addProject(_this.profile.id, resProject._id, resProject.name)
                .subscribe(function (res) {
                console.log('success');
            });
        });
    };
    NewProjectPage = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './new-project.page.html'
        }), 
        __metadata('design:paramtypes', [project_service_1.ProjectService, user_service_1.UserService])
    ], NewProjectPage);
    return NewProjectPage;
}());
exports.NewProjectPage = NewProjectPage;
//# sourceMappingURL=new-project.page.js.map