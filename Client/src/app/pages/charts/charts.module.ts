import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from '@progress/kendo-angular-charts';

import { AuthGuard } from '../../shared/services/auth-guard.service';

import { ProjectChartsComponent } from './charts.component';
import { GeneralStatsChartComponent } from './general-stats/general-stats.component';
import { DeadlineStatsChartComponent } from './deadline-stats/deadline-stats.component';

import { GetTasksValuesPipe } from './get-tasks-values.pipe';
import { GetPieDataPipe } from './get-pie-data.pipe';

let routes: Routes = [
    {
        path: 'charts/:projectName',
        component: ProjectChartsComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ChartsModule
    ],
    declarations: [
        ProjectChartsComponent,
        GeneralStatsChartComponent,
        DeadlineStatsChartComponent,
        GetTasksValuesPipe,
        GetPieDataPipe
    ],
    exports: [
        RouterModule
    ]
})
export class ProjectChartsModule {

}