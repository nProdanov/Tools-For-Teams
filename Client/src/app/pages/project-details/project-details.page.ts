import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PageComponent } from '../../components/page.component/page.component';
import { Project } from '../../models/project.model/project.model';
import { ProjectService } from '../../services/project.service/project.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
    templateUrl: './project-details.page.html'
})
export class ProjectDetailsPage implements PageComponent, OnInit {
    public profile: any;
    public project: Project;

    constructor(private toastr: ToastsManager, private projectService: ProjectService, private route: ActivatedRoute) {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.project = {
            creator: '',
            name: '',
            description: '',
            tasks: [],
            users: []
        }
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.projectService.getProjectById(params['id']))
            .subscribe((project: Project) => {
                this.project = project;
                this.project.users = [];
                this.project.users.push(this.profile.username);
                this.project.tasks = [];
            })
    }
}
