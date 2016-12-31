import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PageComponent } from '../../components/page.component/page.component';
import { ProjectService } from './../../services/project.service/project.service';

@Component({
    templateUrl: './project-charts.page.html',
})
export class ProjectCharts implements PageComponent, OnInit {
    private project: any;
    private tasks: any[];
    private hours: any[];
    private cost: any[];
    private totalCost: number;
    private totalHours: number;
    private numberOfTasks: number;
    private numberOfProjectMembers: number;

    constructor(private projectService: ProjectService, private route: ActivatedRoute,) {
        this.project = {};
        this.tasks = [];
        this.cost = [0];
        this.hours = [0];
        this.totalCost = 0;
        this.totalHours = 0;
        this.numberOfTasks = 0;
        this.numberOfProjectMembers = 0;
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                return this.projectService.getProjectByProjectName(params['projectName'])
            })
            .subscribe(project => {
                this.project = project;
                this.tasks = project.tasks;

                for (let task of this.tasks) {
                    let previousCost = 0;
                    if(this.cost.length > 0) {
                        previousCost = this.cost[this.cost.length - 1];
                    }
                    let currentCost = task.cost;
                    this.cost.push(currentCost + previousCost);
                    this.totalCost = this.totalCost + currentCost;

                    let previousHours = 0;
                    if (this.hours.length > 0) {
                        previousHours = this.hours[this.hours.length - 1];
                    }
                    let currentHours = +task.timeForExecution;                    
                    this.hours.push(currentHours + previousHours);
                    this.totalHours = this.totalHours + currentHours;
                }

                this.numberOfTasks = this.tasks.length;
                this.numberOfProjectMembers = this.project.projectMembers.length;
            });
    }
}