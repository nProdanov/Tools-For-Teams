import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../shared/models/project';
import { ProjectService } from '../../shared/services/project.service';
import { UserService } from '../../shared/services/user.service';
import { ToastsManager } from 'ng2-toastr';
import { StorageService } from '../../shared/services/storage.service';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    selector: 'new-project',
    templateUrl: './new-project.html',
    styleUrls: ['./new-project.css']
})
export class NewProjectComponent implements OnInit {
    @ViewChild('childModal') public childModal: ModalDirective;

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
            projectMembers: [],
            notes: []
        };
    }

    public showChildModal(): void {
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }

    saveProject() {
        this.storageService
            .getProfileItem()
            .subscribe(resProfile => {
                this.profile = resProfile;
                this.project.creator = this.profile.username;
                this.project.name = this.project.name.trim();
                this.projectService
                    .saveProject(this.project)
                    .subscribe((resProject) => {
                        this.userService
                            .addProject(this.profile.id, resProject._id, resProject.name)
                            .subscribe(res => {
                                this.toastr.success("Successfully created new project");
                            });
                    });
            });
    }
}
