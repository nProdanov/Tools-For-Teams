import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ProjectDetailsComponent } from './project-details.component';
import { EditTaskModalComponent } from './edit-task/edit-task.component';
import { NewTaskModalComponent } from './new-task/new-task.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { ModalModule } from 'ng2-bootstrap';

import { AvailableUsersPipe } from './available-users.pipe';
import { AuthGuard } from '../../shared/services/auth-guard.service';

let routes: Routes = [
    {
        path: 'project-details/:id',
        component: ProjectDetailsComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        GridModule,
        Ng2AutoCompleteModule,
        ModalModule
    ],
    declarations: [
        ProjectDetailsComponent,
        EditTaskModalComponent,
        NewTaskModalComponent,
        AvailableUsersPipe
    ],
    exports: [
        ProjectDetailsComponent,
        RouterModule,
        GridModule,
        Ng2AutoCompleteModule
    ]
})
export class ProjectDetailsModule {

}