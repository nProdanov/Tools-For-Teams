import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

let routes: Routes = [
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        NotFoundComponent
    ],
    exports: [
        RouterModule
    ]
})
export class NotFoundModule {

}