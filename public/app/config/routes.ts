import { pages } from './../pages/index';
import { Routes } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service/auth.guard.service';

export const appRoutes: Routes = [
    { path: 'superheroes-list', component: pages.superheroes },
    { path: 'factions-list', component: pages.factions },
    { path: 'profile', component: pages.profile, canActivate: [AuthGuard] },
    { path: 'new-project', component: pages.newProject, canActivate: [AuthGuard] }
];
