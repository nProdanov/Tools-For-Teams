import { pages } from './../pages/index';
import { Routes } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service/auth.guard.service';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: pages.home },
    { path: 'login', component: pages.login },
    { path: 'login-callback', redirectTo: '/home', pathMatch: 'full' },
    { path: 'register', component: pages.register },
    { path: 'profile', component: pages.profile, canActivate: [AuthGuard] },
    { path: 'profile/:username', component: pages.otherProfile, canActivate: [AuthGuard] },
    { path: 'my-projects', component: pages.myProjects, canActivate: [AuthGuard] },
    { path: 'project-details/:id', component: pages.projectDetails, canActivate: [AuthGuard] },
    { path: 'my-toolbox', component: pages.myToolbox, canActivate: [AuthGuard] },
    { path: 'charts/:projectName', component: pages.projectCharts, canActivate: [AuthGuard] },
    { path: 'notes/:projectName', component: pages.projectNotes, canActivate: [AuthGuard] }
];
