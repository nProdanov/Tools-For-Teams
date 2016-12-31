import { Component, OnInit } from '@angular/core';
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
    private numberOfStickies: number = 12;
    private project: any;
    private tasks: any[];
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