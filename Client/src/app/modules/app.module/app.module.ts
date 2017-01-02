import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { appRoutes } from '../../config/routes';
import { AppComponent } from '../../components/app.component/app.component';
import { NewTaskModalComponent } from '../../components/new-task.component/new-task.component';
import { ToastModule } from 'ng2-toastr';
import { GridModule } from '@progress/kendo-angular-grid';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { ModalModule } from 'ng2-bootstrap';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { GeneralStatsChartComponent } from './../../components/general-stats-chart.componenet/general-stats-chart.componenet';
import { DeadlineStatsChartComponent } from './../../components/deadline-stats-chart.component/deadline-stats-chart.component';
import { EditTaskModalComponent } from '../../components/edit-task.component/edit-task.component';

//  Pages
import { NavbarComponent } from '../../components/navbar.component/navbar.component';
import { ProfilePage } from '../../pages/profile/profile.page';
import { NewProjectPage } from '../../pages/new-project/new-project.page';
import { AboutPage } from '../../pages/about/about.page';
import { LoginPage } from '../../pages/login/login.page';
import { RegisterPage } from '../../pages/register/register.page';
import { HomePage } from '../../pages/home/home.page';
import { MyProjectsPage } from '../../pages/my-projects/my-projects.page';
import { ProjectDetailsPage } from '../../pages/project-details/project-details.page';
import { ToolboxPage } from './../../pages/my-toolbox/my-toolbox.page';
import { ProjectCharts } from './../../pages/project-charts/project-charts.page';
import { OtherProfilePage } from '../../pages/other-profile/other-profile.page'
import { ProjectNotesPage } from './../../pages/project-notes/project-notes.page';
import { OurStatsPage } from './../../pages/our-stats/our-stats.page';
import { GetStartedPage } from './../../pages/get-started/get-started.page';
import { NotFoundPage } from './../../pages/not-found/not-found.page';

//  Services
import { AuthGuard } from '../../services/auth-guard.service/auth.guard.service';
import { Auth } from '../../services/auth.service/auth.service';
import { ProjectService } from '../../services/project.service/project.service';
import { UserService } from '../../services/user.service/user.service';
import { TaskService } from '../../services/task.service/task.service';
import { StorageService } from '../../services/storage.service/storage.service';
import { ChatService } from '../../services/chat.service/chat.service';
import { NotificationService } from '../../services/notification.service/notification.service';
import { AboutDataService } from './../../services/about-data.service/about-data.service';

//  Pipes
import { GetTasksValuesPipe } from './../../pipes/get-tasks-values.pipe';
import { GetPieDataPipe } from './../../pipes/get-pie-data.pipe';
import { FormatDatePipe } from './../../pipes/date.pipe';
import { GenderPipe } from './../../pipes/gender.pipe';
import { CompanyPipe } from './../../pipes/company.pipe';
import { AvailableUsersPipe } from './../../pipes/available-users-for-add.pipe';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: false }),
    FormsModule,
    ToastModule,
    GridModule,
    Ng2AutoCompleteModule,
    ModalModule.forRoot(),
    ChartsModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfilePage,
    NewProjectPage,
    LoginPage,
    RegisterPage,
    HomePage,
    MyProjectsPage,
    ProjectDetailsPage,
    FormatDatePipe,
    GenderPipe,
    CompanyPipe,
    ToolboxPage,
    NewTaskModalComponent,
    ProjectCharts,
    GeneralStatsChartComponent,
    DeadlineStatsChartComponent,
    GetTasksValuesPipe,
    GetPieDataPipe,
    AvailableUsersPipe,
    EditTaskModalComponent,
    OtherProfilePage,
    ProjectNotesPage,
    AboutPage,
    OurStatsPage,
    GetStartedPage,
    NotFoundPage
  ],
  bootstrap: [AppComponent],
  providers: [
    Auth,
    AuthGuard,
    ProjectService,
    UserService,
    TaskService,
    StorageService,
    ChatService,
    NotificationService,
    AboutDataService
  ]
})
export class AppModule { }
