import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormComponent } from './project-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';
import { Project } from 'src/app/_models/project.model';
import { UserService } from 'src/app/_services/user.service';
import { TaskService } from 'src/app/_services/task.service';
import { ProjectService } from 'src/app/_services/project.service';

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;
  let usrSrv, taskSrv, prjSrv;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule],
      declarations: [ProjectFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [HttpClient]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    usrSrv = debugElement.injector.get(UserService);
    taskSrv = debugElement.injector.get(TaskService);
    prjSrv = debugElement.injector.get(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('method calls', () => {

    let newProject;
    beforeAll(() => {
      newProject = new Project({
        _id: '000',
        manager: 'manager',
        project: 'project',
        startDate: new Date(),
        endDate: new Date(),
        priority: 0
      });
    });

    it('UpdateProject', () => {
      component.UpdateProject(newProject);
      expect(newProject).toEqual(component.updateProject);
    });

    it('getManagerName', () => {
      spyOn(usrSrv, 'getUserById').and.returnValue({ subscribe: () => { } });
      component.getManagerName(newProject);
      expect(usrSrv.getUserById).toHaveBeenCalled();
    });

    xit('getTasksOnProjectId', () => {
      spyOn(taskSrv, 'getAllTasksByProjectId').and.returnValue({ subscribe: () => { } });
      component.getTasksOnProjectId(newProject);
      expect(taskSrv.getAllTasksByProjectId).toHaveBeenCalled();
    });

    it('loadProjects', () => {
      spyOn(prjSrv, 'getProjects').and.returnValue({ subscribe: () => { } });
      spyOn(component, 'getTasksOnProjectId');
      component.loadProjects();
      expect(prjSrv.getProjects).toHaveBeenCalled();
      // expect(component.getTasksOnProjectId).toHaveBeenCalled();
    });

    it('refreshProjectDetails', () => {
      spyOn(component, 'loadProjects');
      component.refreshProjectDetails('');
      expect(component.loadProjects).toHaveBeenCalled();
    });

  });
});
