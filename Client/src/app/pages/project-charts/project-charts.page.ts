import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PageComponent } from '../../components/page.component/page.component';
import { ProjectService } from './../../services/project.service/project.service';

@Component({
    templateUrl: './project-charts.page.html'
})
export class ProjectCharts implements PageComponent, OnInit {
    private project: any;
    private tasks: any[];
    private hours: any[];
    private cost: any[];
    private totalCost: number;
    private totalHours: number;


    constructor(private projectService: ProjectService, private route: ActivatedRoute,) {
        this.project = {};
        this.tasks = [];
        this.cost = [];
        this.hours = [];
        this.totalCost = 0;
        this.totalHours = 0;
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                return this.projectService.getProjectByProjectName(params['projectName'])
            })
            .subscribe(project => {
                this.project = project;
                this.tasks = project.tasks;
                console.log(this.project);
                console.log(this.tasks);

                for (let task of this.tasks) {
                    let currentCost = task.cost;
                    let currentHours = +task.timeForExecution;

                    this.cost.push(currentCost);
                    this.hours.push(currentHours);

                    this.totalCost = this.totalCost + currentCost;
                    this.totalHours = this.totalHours + currentHours;
                }

                console.log(this.cost);
                console.log(this.hours);

                console.log(this.totalCost);
                console.log(this.totalHours);
            });
    }
}