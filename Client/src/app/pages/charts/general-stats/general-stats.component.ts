import { Component, Input } from '@angular/core';

@Component({
    selector: 'general-stats-chart',
    templateUrl: './general-stats.html'
})
export class GeneralStatsChartComponent {
    @Input() tasksValues: any[];
}