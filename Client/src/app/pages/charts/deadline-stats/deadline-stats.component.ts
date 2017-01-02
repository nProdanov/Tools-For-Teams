import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'deadline-stats-chart',
    templateUrl: './deadline-stats.html'
})
export class DeadlineStatsChartComponent {
    @Input() pieData: any[];

    constructor () {
    }
}
