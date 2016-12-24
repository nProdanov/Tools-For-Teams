import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { appRoutes } from '../../config/routes';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from '../../components/app.component/app.component';

//  Pages
import { ProfilePage } from '../../pages/profile/profile.page';
import { NewProjectPage } from '../../pages/new-project/new-project.page';
import { LoginPage } from '../../pages/login/login.page';
import { RegisterPage } from '../../pages/register/register.page';
import { HomePage } from '../../pages/home/home.page';

//  Services
import { AuthGuard } from '../../services/auth-guard.service/auth.guard.service';
import { Auth } from '../../services/auth.service/auth.service';
import { ProjectService } from '../../services/project.service/project.service';
import { UserService } from '../../services/user.service/user.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: false }),
    FormsModule
  ],
  declarations: [
    AppComponent,
    ProfilePage,
    NewProjectPage,
    LoginPage,
    RegisterPage,
    HomePage
  ],
  bootstrap: [AppComponent],
  providers: [
    Auth,
    AUTH_PROVIDERS,
    AuthGuard,
    ProjectService,
    UserService
  ]
})
export class AppModule { }
