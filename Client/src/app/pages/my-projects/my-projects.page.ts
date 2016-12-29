import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../components/page.component/page.component';
import { Project } from '../../models/project.model/project.model';
import { ProjectService } from '../../services/project.service/project.service';
import { Router } from '@angular/router';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { StorageService } from '../../services/storage.service/storage.service';
import { UserService } from '../../services/user.service/user.service';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './my-projects.page.html'
})
export class MyProjectsPage implements PageComponent, OnInit {
    public profile: any;
    public projects: any[];
    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
    private pageSize: number = 10;
    private skip: number = 0;

    constructor(private userService: UserService, private storageService: StorageService, private router: Router, private projectService: ProjectService) {
        this.profile = {};
    }
    
    ngOnInit() {
        this.storageService
            .getProfileItem()
            .subscribe(resProfile => {
                this.profile = resProfile;
                this.userService
                    .getUserById(this.profile.id)
                    .subscribe(resUser => {
                        let projectsObservables: Observable<any>[] = [];
                        resUser.projects.forEach(proj => {
                            projectsObservables.push(this.projectService.getMappedProjectById(proj.id));
                        });

                        Observable
                            .forkJoin(...projectsObservables)
                            .subscribe(data => {
                                this.projects = data;
                                this.gridView = {
                                    data: this.projects.slice(this.skip, this.skip + this.pageSize),
                                    total: this.projects.length
                                }
                            });
                    });
            });
    }

    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadProjects();
    }

    protected pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.pageSizeProjects();
    }

    private pageSizeProjects(): void {
        this.gridView = {
            data: this.projects.slice(this.skip, this.skip + this.pageSize),
            total: this.projects.length
        };
    }

    private onSelect(e) {
        this.router.navigateByUrl(`/project-details/${this.gridView.data[e.index % this.pageSize]._id}`);
    }

    private loadProjects(): void {
        this.gridView = {
            data: orderBy(this.projects, this.sort),
            total: this.projects.length
        };
    }
}
