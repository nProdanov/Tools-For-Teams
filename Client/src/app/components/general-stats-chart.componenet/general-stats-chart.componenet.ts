import { Component, Input } from '@angular/core';

@Component({
    selector: 'general-stats-chart',
    templateUrl: './general-stats-chart.componenet.html'
})
export class GeneralStatsChartComponent {
    @Input() tasksValues: any[];

    private onSeriesClick(e): void {
        console.log(this.tasksValues);
    }
}