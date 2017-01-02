import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ng2-bootstrap';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';


import { AppComponent } from './app.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';

import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { ToastModule } from 'ng2-toastr';


// import { appRoutes } from './routes/routes';


// import { Auth } from '../../services/auth.service';
// import { StorageService } from '../../services/storage.service/storage.service';
// import { NewProjectPage } from '../../pages/new-project/new-project.page';

let appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    NewProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PagesModule,
    SharedModule,
    ToastModule,
    RouterModule.forRoot(appRoutes, { useHash: false }),
    ModalModule.forRoot(),
    Ng2AutoCompleteModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
