import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';

let routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'login-callback',
        redirectTo: '/home',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent,
        RouterModule
    ]
})
export class LoginModule {

}