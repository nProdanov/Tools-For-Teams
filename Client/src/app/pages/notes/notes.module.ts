import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/services/auth-guard.service';


import { ProjectNotesComponent } from './notes.component';

let routes: Routes = [
    {
        path: 'notes/:projectName',
        component: ProjectNotesComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ProjectNotesComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ProjectNotesModule {

}