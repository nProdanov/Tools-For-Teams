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
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
var routes_1 = require('../../config/routes');
var angular2_jwt_1 = require('angular2-jwt');
var app_component_1 = require('../../components/app.component/app.component');
//  Pages
var profile_page_1 = require('../../pages/profile/profile.page');
var new_project_page_1 = require('../../pages/new-project/new-project.page');
var login_page_1 = require('../../pages/login/login.page');
//  Services
var auth_guard_service_1 = require('../../services/auth-guard.service/auth.guard.service');
var auth_service_1 = require('../../services/auth.service/auth.service');
var project_service_1 = require('../../services/project.service/project.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(routes_1.appRoutes, { useHash: false }),
                forms_1.FormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                profile_page_1.ProfilePage,
                new_project_page_1.NewProjectPage,
                login_page_1.LoginPage
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                auth_service_1.Auth,
                angular2_jwt_1.AUTH_PROVIDERS,
                auth_guard_service_1.AuthGuard,
                project_service_1.ProjectService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map