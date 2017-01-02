import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';

import { AuthGuard } from '../../shared/services/auth-guard.service';

import { CompanyPipe } from './company.pipe';
import { GenderPipe } from './gender.pipe';

let routes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ProfileComponent,
        GenderPipe,
        CompanyPipe
    ],
    exports: [
        ProfileComponent,
        RouterModule
    ]
})
export class ProfileModule {

}