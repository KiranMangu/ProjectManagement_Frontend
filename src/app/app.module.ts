import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
<<<<<<< HEAD
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
=======
import { ReactiveFormsModule } from '@angular/forms';
>>>>>>> dbf1c28e85037355f26d7e19fb920c69026641ce
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
<<<<<<< HEAD
import { MatInputModule, MatButtonModule, MatCardModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material';
import { MatSliderModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
=======
import { MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';
>>>>>>> dbf1c28e85037355f26d7e19fb920c69026641ce

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { ViewProjectComponent } from './project/view-project/view-project.component';
import { ProjectFormComponent } from './project/project-form/project-form.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { ViewTaskComponent } from './task/view-task/view-task.component';
import { TaskFormComponent } from './task/task-form/task-form.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUserComponent,
    ViewUserComponent,
    UserFormComponent,
    AddProjectComponent,
    ViewProjectComponent,
    ProjectFormComponent,
    AddTaskComponent,
    ViewTaskComponent,
    TaskFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    FormsModule, // MyComments: for fixing error: No provider for ControlContainer ("<div> [ERROR ->]<form > <div>
    MatToolbarModule, MatTabsModule, MatDividerModule, MatCheckboxModule,
    MatInputModule, MatButtonModule, MatCardModule,
    MatDatepickerModule, MatNativeDateModule, MatSliderModule,
=======
    MatToolbarModule, MatTabsModule, MatDividerModule, 
    MatInputModule, MatButtonModule, MatCardModule,
>>>>>>> dbf1c28e85037355f26d7e19fb920c69026641ce
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
