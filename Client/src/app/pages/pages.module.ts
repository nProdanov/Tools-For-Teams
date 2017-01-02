import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ProfileModule } from './profile/profile.module';
import { MyProjectsModule } from './my-projects/my-projects.module';
import { ProjectDetailsModule } from './project-details/project-details.module';
import { OtherProfileModule } from './other-profile/other-profile.module';
import { MyToolboxModule } from './my-toolbox/my-toolbox.module';
import { ProjectChartsModule } from './charts/charts.module';
import { ProjectNotesModule } from './notes/notes.module';
import { OurStatsModule } from './our-stats/our-stats.module';
import { GetStartedModule } from './get-started/get-started.module';
import { NotFoundModule } from './not-found/not-found.module';

@NgModule({
  imports: [
    CommonModule,
    AboutModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    ProfileModule,
    MyProjectsModule,
    ProjectDetailsModule,
    OtherProfileModule,
    MyToolboxModule,
    ProjectChartsModule,
    ProjectNotesModule,
    OurStatsModule,
    GetStartedModule,
    NotFoundModule
  ],
  declarations: [],
  exports: [RouterModule]
})
export class PagesModule { }
