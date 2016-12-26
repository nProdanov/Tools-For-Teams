"use strict";
var index_1 = require('./../pages/index');
var auth_guard_service_1 = require('../services/auth-guard.service/auth.guard.service');
exports.appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: index_1.pages.home },
    { path: 'login', component: index_1.pages.login },
    { path: 'login-callback', redirectTo: '/', pathMatch: 'full' },
    { path: 'register', component: index_1.pages.register },
    { path: 'profile', component: index_1.pages.profile, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'new-project', component: index_1.pages.newProject, canActivate: [auth_guard_service_1.AuthGuard] }
];
//# sourceMappingURL=routes.js.map