import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/services/auth-guard.service';


import { ToolboxComponent } from './my-toolbox.component';

let routes: Routes = [
    {
        path: 'my-toolbox',
        component: ToolboxComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ToolboxComponent
    ],
    exports: [
        RouterModule
    ]
})
export class MyToolboxModule {

}