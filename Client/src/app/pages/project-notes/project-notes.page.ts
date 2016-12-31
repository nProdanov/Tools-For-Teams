import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PageComponent } from '../../components/page.component/page.component';
import { ProjectService } from './../../services/project.service/project.service';

@Component({
    templateUrl: './project-notes.page.html',
    styleUrls: [
        './project-project-notes.page.css'
    ]
})
export class ProjectNotesPage implements PageComponent, OnInit {
    private project: any;
    private notes: any[];

    constructor(private projectService: ProjectService, private route: ActivatedRoute,) {
        this.project = {};
        this.notes = [];
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                return this.projectService.getProjectByProjectName(params['projectName'])
            })
            .subscribe(project => {
                this.project = project;                
                this.notes = project.notes;
            });
    }

    ngOnDestroy() {
        this.projectService.addNotesToProject(this.project.name, this.notes)
            .subscribe();
    }

    addNote(title: string, text: string) {
        if (title === '' || text === '') {
            return;
        }

        let note = {title: title, text: text};
        this.notes.push(note);
    }

    removeNote(note: {}) {
        let index = this.notes.indexOf(note);
        if (index > -1) {
            this.notes.splice(index, 1);
        }
    }
}