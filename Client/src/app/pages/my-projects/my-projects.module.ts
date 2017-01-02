import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';

import { AuthGuard } from '../../shared/services/auth-guard.service';


import { MyProjectsComponent } from './my-projects.component';

let routes: Routes = [
    {
        path: 'my-projects',
        component: MyProjectsComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        GridModule
    ],
    declarations: [
        MyProjectsComponent
    ],
    exports: [
        MyProjectsComponent,
        RouterModule,
        GridModule
    ]
})
export class MyProjectsModule {

}