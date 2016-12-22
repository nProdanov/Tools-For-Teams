import { pages } from './../pages/index';
import { Routes } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service/auth.guard.service';

export const appRoutes: Routes = [
    { path: 'login', component: pages.login },
    { path: 'login-callback', redirectTo: '/', pathMatch: 'full' },
    { path: 'register', component: pages.register },
    { path: 'profile', component: pages.profile, canActivate: [AuthGuard] },
    { path: 'new-project', component: pages.newProject, canActivate: [AuthGuard] }
];
