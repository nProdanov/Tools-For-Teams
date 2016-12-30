import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'deadline-stats-chart',
    templateUrl: './deadline-stats-chart.component.html'
})
export class DeadlineStatsChartComponent {
    @Input() pieData: any[];

    constructor () {
    }

    ngOnInit() {
        // console.log(this.pieData);
    }
}
