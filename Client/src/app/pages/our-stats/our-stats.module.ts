import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { OurStatsComponent } from './our-stats.component';

let routes: Routes = [
    {
        path: 'our-stats',
        component: OurStatsComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        OurStatsComponent
    ],
    exports: [
        RouterModule
    ]
})
export class OurStatsModule {

}