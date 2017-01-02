import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/services/auth-guard.service';

import { CompanyPipe } from './company.pipe';
import { GenderPipe } from './gender.pipe';

import { OtherProfileComponent } from './other-profile.component';

let routes: Routes = [
    {
        path: 'profile/:username',
        component: OtherProfileComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        OtherProfileComponent,
        CompanyPipe,
        GenderPipe
    ],
    exports: [
        OtherProfileComponent,
        RouterModule
    ]
})
export class OtherProfileModule {

}