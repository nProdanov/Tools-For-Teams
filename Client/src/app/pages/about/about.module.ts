import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AboutDataService } from './about.service';

import { AboutPageComponent } from './about.component';

let routes: Routes = [
    {
        path: 'about',
        component: AboutPageComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AboutPageComponent
    ],
    exports: [
        AboutPageComponent,
        RouterModule
    ],
    providers: [
        AboutDataService
    ]
})
export class AboutModule {

}