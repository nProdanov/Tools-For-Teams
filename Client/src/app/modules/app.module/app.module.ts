import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { appRoutes } from '../../config/routes';
import { AppComponent } from '../../components/app.component/app.component';
import { NewTaskModalComponent } from '../../components/new-task.component/new-task.component';
import { ToastModule } from 'ng2-toastr';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { ModalModule } from 'ng2-bootstrap';

//  Pages
import { ProfilePage } from '../../pages/profile/profile.page';
import { NewProjectPage } from '../../pages/new-project/new-project.page';
import { LoginPage } from '../../pages/login/login.page';
import { RegisterPage } from '../../pages/register/register.page';
import { HomePage } from '../../pages/home/home.page';
import { MyProjectsPage } from '../../pages/my-projects/my-projects.page';
import { ProjectDetailsPage } from '../../pages/project-details/project-details.page';
import { ToolboxPage } from './../../pages/my-toolbox/my-toolbox.page';
import { ProjectCharts } from './../../pages/project-charts/project-charts.page';

//  Services
import { AuthGuard } from '../../services/auth-guard.service/auth.guard.service';
import { Auth } from '../../services/auth.service/auth.service';
import { ProjectService } from '../../services/project.service/project.service';
import { UserService } from '../../services/user.service/user.service';
import { TaskService } from '../../services/task.service/task.service';
import { StorageService } from '../../services/storage.service/storage.service';
import { ChatService } from '../../services/socket.service/socket.service';

//  Pipes
import { FormatDatePipe } from './../../pipes/date.pipe'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: false }),
    FormsModule,
    ToastModule,
    ButtonsModule,
    GridModule,
    Ng2AutoCompleteModule,
    InfiniteScrollModule,
    ModalModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ProfilePage,
    NewProjectPage,
    LoginPage,
    RegisterPage,
    HomePage,
    MyProjectsPage,
    ProjectDetailsPage,
    FormatDatePipe,
    ToolboxPage,
    NewTaskModalComponent,
    ProjectCharts
  ],
  bootstrap: [AppComponent],
  providers: [
    Auth,
    AuthGuard,
    ProjectService,
    UserService,
    TaskService,
    StorageService,
    ChatService
  ]
})
export class AppModule { }
