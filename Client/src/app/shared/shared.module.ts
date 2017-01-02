import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Auth } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { NotificationService } from './services/notification.service';
import { ProjectService } from './services/project.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-guard.service';
import { TaskService } from './services/task.service';
import { ChatService } from './services/chat.service';
import { AboutDataService } from './services/about-data.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
    exports: [],
    providers: [
        Auth,
        StorageService,
        NotificationService,
        ProjectService,
        UserService,
        AuthGuard,
        TaskService,
        ChatService,
        AboutDataService
    ]
})
export class SharedModule { }
