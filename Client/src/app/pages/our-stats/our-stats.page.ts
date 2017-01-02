import { Component, OnInit } from '@angular/core';

import { ProjectService } from './../../services/project.service/project.service';
import { UserService } from './../../services/user.service/user.service';
import { TaskService } from './../../services/task.service/task.service';

@Component({
    templateUrl: './our-stats.page.html',
    styles: ['.img-responsive { margin: 0 auto; }']
})
export class OurStatsPage {
    private allProjects: number;
    private allUsers: number;
    private allTasks: number;

    constructor(private projectService: ProjectService, private userService: UserService, private taskService: TaskService) {
    }

    ngOnInit() {
        this.projectService.getAllProjects()
            .subscribe(projects => {
                this.allProjects = projects.length;
            });
        
        this.userService.getAllUsers()
            .subscribe(users => {
                this.allUsers = users.length;
            });

        this.taskService.getAllTasks()
            .subscribe(tasks => {
                this.allTasks = tasks.length;
            });
    }
};