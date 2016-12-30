import { Component, Input } from '@angular/core';

@Component({
    selector: 'deadline-stats-chart',
    templateUrl: './deadline-stats-chart.component.html'
})
export class DeadlineStatsChartComponent {
    @Input() pieData: any[];

    // this.pieData = [
    //     { category: 'Time spent', value: 3 },
    //     { category: 'Time left', value: 7 }
    // ]
}
