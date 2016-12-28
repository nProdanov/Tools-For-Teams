import { pages } from './../pages/index';
import { Routes } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service/auth.guard.service';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: pages.home },
    { path: 'login', component: pages.login },
    { path: 'login-callback', redirectTo: '/', pathMatch: 'full' },
    { path: 'register', component: pages.register },
    { path: 'profile', component: pages.profile, canActivate: [AuthGuard] },
    { path: 'new-project', component: pages.newProject, canActivate: [AuthGuard] },
    { path: 'my-projects', component: pages.myProjects },
    { path: 'project-details/:id', component: pages.projectDetails },
    { path: 'my-toolbox', component: pages.myToolbox }
];
