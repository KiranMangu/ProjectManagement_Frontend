import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule, MatButtonModule, MatCardModule, MatNativeDateModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { MatSliderModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
import { DialogComponent } from './shared/dialog.component';

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
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, // MyComments: for fixing error: No provider for ControlContainer ("<div> [ERROR ->]<form > <div>
    MatToolbarModule, MatTabsModule, MatDividerModule, MatCheckboxModule,
    MatInputModule, MatButtonModule, MatCardModule, MatRadioModule,
    MatDatepickerModule, MatNativeDateModule, MatSliderModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [DialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
