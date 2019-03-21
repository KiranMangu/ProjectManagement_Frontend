import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { MatDatepickerModule, MatSnackBarModule, MatNativeDateModule, MatCheckboxModule, MatSliderModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from 'src/app/_services/project.service';
import { Task } from 'src/app/_models/task.model';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let prjSrv;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatSliderModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    prjSrv = debugElement.injector.get(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });

  describe('method calls', () => {

    it('ngOnChanges', () => {
      component.ngOnChanges({
        data: new SimpleChange('preValue', 'currValue', true)
      });
      expect(component.ngOnChanges).toBeTruthy();
    });

    it('checkDate', () => {
      const date = new Date();
      const nextDate = new Date().setDate(date.getDate() + 1);
      component.taskGroup.controls.endDate.setValue(date);
      component.taskGroup.controls.startDate.setValue(nextDate);
      const retValue = component.checkDate(component.taskGroup);
      expect(retValue).toEqual({ notValid: true });
    });
    // TODO: Subscribe
    xit('getOtherFields', () => {
      spyOn(prjSrv, 'getProjectById');
      component.getOtherFields('pd01', 'rnt01')
    });

    it('fillFieldsForUpdate', () => {
      const tempTask = new Task({
        task: 'task',
        startDate: new Date,
        endDate: new Date(),
        priority: 0
      });
      component.fillFieldsForUpdate(tempTask);
    });

    it('onParentTaskSelected', () => {
      // component.is
      component.taskGroup.controls.isParentTask.setValue(true);
      component.onParentTaskSelected();
      expect(component.taskGroup.controls.projectName.disabled).toEqual(false);
      component.taskGroup.controls.isParentTask.setValue(false);
      component.onParentTaskSelected();
      expect(component.taskGroup.controls.projectName.disabled).toEqual(true);
    });

    // TODO Subscribe
    it('getProjects', () => {
      spyOn(component, 'getProjects').and.returnValue(true);
      component.getProjects();
      expect(component.getProjects).toBeTruthy();
      // spyOn(prjSrv, 'getProjects').and.returnValue(true);
      // component.getProjects();
      // expect(prjSrv.getProjects).toHaveBeenCalled();
    });

    it('getParentTasks', () => {
      spyOn(component, 'getParentTasks').and.returnValue(true);
      component.getParentTasks();
      expect(component.getParentTasks).toBeTruthy();
    });

    it('getUsers', () => {
      spyOn(component, 'getUsers').and.returnValue(true);
      component.getUsers();
      expect(component.getUsers).toBeTruthy();
    });

    it('addTask', () => {
      component.taskGroup.controls.isParentTask.setValue(false);
      component.addTask();
      component.taskGroup.controls.isParentTask.setValue(true);
      component.addTask();
      component.taskGroup.setValidators(() => { return { notValid: true } })
      component.addTask();
    });

    it('clearTagetObject', () => {
      component.clearTagetObject();
      expect(component.clearTagetObject).toBeTruthy();
    });

  });
});
