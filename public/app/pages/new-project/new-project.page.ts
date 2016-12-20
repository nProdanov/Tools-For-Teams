import { Component } from '@angular/core';
import { PageComponent } from '../../components/page.component/page.component';
import { Project } from '../../models/project.model/project.model';
import { ProjectService } from '../../services/project.service/project.service';

@Component({
    moduleId: module.id,
    templateUrl: './new-project.page.html'
})
export class NewProjectPage implements PageComponent {
    public profile: any;
    public project: Project;

    constructor(private service: ProjectService) {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }

    ngOnInit() {
        this.project = {
            creator: '',
            name: '',
            description: ''
        };

        this.project.creator = this.profile.nickname;
    }

    saveProject() {
        this.service.saveProject(this.project).subscribe((res) => {
            console.log(res);
        });
    }
}
