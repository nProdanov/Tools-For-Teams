import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PageComponent } from '../../components/page.component/page.component';
import { ProjectService } from './../../services/project.service/project.service';

@Component({
    templateUrl: './project-notes.page.html',
})
export class ProjectNotesPage implements PageComponent, OnInit {
    private project: any;
    private tasks: any[];

    constructor(private projectService: ProjectService, private route: ActivatedRoute,) {
        this.project = {};
        this.tasks = [];
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
                    
                }


            });
    }
}