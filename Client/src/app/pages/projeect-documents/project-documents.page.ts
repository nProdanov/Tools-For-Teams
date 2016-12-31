import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PageComponent } from '../../components/page.component/page.component';
import { ProjectService } from './../../services/project.service/project.service';

@Component({
    templateUrl: './project-documents.page.html',
})
export class ProjectDocumentsPage implements PageComponent, OnInit {
    

    constructor(private projectService: ProjectService, private route: ActivatedRoute,) {
        
    }

    ngOnInit() {
        // this.route.params
        //     .switchMap((params: Params) => {
        //         return this.projectService.getProjectByProjectName(params['projectName'])
        //     })
        //     .subscribe(project => {
        //         this.project = project;
        //         this.tasks = project.tasks;

        //         for (let task of this.tasks) {
        //             let previousCost = 0;
        //             if(this.cost.length > 0) {
        //                 previousCost = this.cost[this.cost.length - 1];
        //             }
        //             let currentCost = task.cost;
        //             this.cost.push(currentCost + previousCost);
        //             this.totalCost = this.totalCost + currentCost;

        //             let previousHours = 0;
        //             if (this.hours.length > 0) {
        //                 previousHours = this.hours[this.hours.length - 1];
        //             }
        //             let currentHours = +task.timeForExecution;                    
        //             this.hours.push(currentHours + previousHours);
        //             this.totalHours = this.totalHours + currentHours;
        //         }

        //         this.numberOfTasks = this.tasks.length;
        //     });
    }
}