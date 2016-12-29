import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PageComponent } from '../../components/page.component/page.component';
import { ProjectService } from './../../services/project.service/project.service';

@Component({
    templateUrl: './project-charts.page.html'
})
export class ProjectCharts implements PageComponent, OnInit {
    private project: any;

    constructor(private projectService: ProjectService, private route: ActivatedRoute,) {
        this.project = {};
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                return this.projectService.getProjectByProjectName(params['projectName'])
            })
            .subscribe(project => {
                this.project = project;
                console.log(this.project);
            });
    }
}