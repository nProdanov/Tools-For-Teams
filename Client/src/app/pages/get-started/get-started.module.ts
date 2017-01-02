import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GetStartedComponent } from './get-started.component';

let routes: Routes = [
    {
        path: 'get-started',
        component: GetStartedComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        GetStartedComponent
    ],
    exports: [
        RouterModule
    ]
})
export class GetStartedModule {

}