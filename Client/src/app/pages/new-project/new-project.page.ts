import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../components/page.component/page.component';
import { Project } from '../../models/project.model/project.model';
import { ProjectService } from '../../services/project.service/project.service';
import { UserService } from '../../services/user.service/user.service';
import { ToastsManager } from 'ng2-toastr';
import { StorageService } from '../../services/storage.service/storage.service';

@Component({
    selector: 'new-project',
    templateUrl: './new-project.page.html'
})
export class NewProjectPage implements PageComponent, OnInit {
    public profile: any;
    public project: Project;

    constructor(
        private storageService: StorageService,
        private toastr: ToastsManager,
        private projectService: ProjectService,
        private userService: UserService) {
        this.profile = {};
    }

    ngOnInit() {
        this.project = {
            creator: '',
            name: '',
            description: '',
            tasks: [],
            projectMembers: []
        };
    }

    saveProject() {
        this.storageService
            .getProfileItem()
            .subscribe(resProfile => {
                this.profile = resProfile;
                this.project.creator = this.profile.username;

                this.projectService
                    .saveProject(this.project)
                    .subscribe((resProject) => {
                        console.log(resProject);
                        this.userService
                            .addProject(this.profile.id, resProject._id, resProject.name)
                            .subscribe(res => {
                                this.toastr.success("Successfully created new project");
                            });
                    });
            });

    }
}
