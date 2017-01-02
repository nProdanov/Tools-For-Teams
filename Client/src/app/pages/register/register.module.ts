import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register.component';

let routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        RegisterComponent
    ],
    exports: [
        RegisterComponent,
        RouterModule
    ]
})
export class RegisterModule {

}