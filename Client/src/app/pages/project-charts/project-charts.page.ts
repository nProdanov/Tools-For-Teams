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
    private costScale: number;
    private hoursScale: number;
    private chartTitle: any;
    private tasksValues: any[];

    constructor(private projectService: ProjectService, private route: ActivatedRoute,) {
        this.project = {};
        this.tasks = [];
        this.cost = [0];
        this.hours = [0];
        this.totalCost = 0;
        this.totalHours = 0;
        this.costScale = 0;
        this.hoursScale = 0;
        this.chartTitle = {};
        this.tasksValues = [];
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                return this.projectService.getProjectByProjectName(params['projectName'])
            })
            .subscribe(project => {
                this.project = project;
                this.tasks = project.tasks;

                this.tasksValues.push([0,0]);

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

                    this.tasksValues.push([currentCost + previousCost, currentHours + previousHours])
                }

                this.costScale = (Math.floor(this.totalCost / 100) + 1) * 100;
                this.hoursScale = this.totalHours + 1;                
                this.chartTitle.text = this.project.name;
            });
    }

    private onSeriesClick(e): void {
        let counter = 0;
        for(let j = 0; j < this.tasksValues.length; j++){
            if(this.tasksValues[j][0] == e.value.x && this.tasksValues[j][1] == e.value.y){
                break;
            }
            counter++;
        }

        counter--;
        if(counter < 0) {
            return;
        }

        let selectedTask = this.tasks[counter];

        console.log("TODO: make modal for task page " + this.tasks[counter].title);    
    }
}