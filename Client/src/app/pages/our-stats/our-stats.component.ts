import { Component, OnInit } from '@angular/core';

import { ProjectService } from './../../shared/services/project.service';
import { UserService } from './../../shared/services/user.service';
import { TaskService } from './../../shared/services/task.service';

@Component({
    templateUrl: './our-stats.html',
    styles: ['.img-responsive { margin: 0 auto; }']
})
export class OurStatsComponent {
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