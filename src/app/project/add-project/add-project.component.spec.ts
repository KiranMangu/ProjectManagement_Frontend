import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectComponent } from './add-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSliderModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ButtonActions } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';
import { ProjectService } from '../../_services/project.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from '../../_shared/dialog.component';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let usrSrv, prjSrv;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSliderModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      declarations: [AddProjectComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    usrSrv = debugElement.injector.get(UserService);
    prjSrv = debugElement.injector.get(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('method calls', () => {

    it('ngOnChanges', () => {
      component.ngOnChanges({
        data: new SimpleChange('prevValue', 'currValue', true)
      })
      expect(component.ngOnChanges).toBeTruthy();
      expect(component.buttonAction).toEqual(ButtonActions.Update)
    });

    it('checkDates', () => {
      // component.projectGroup.setValidators(() => { return { notValid: true } })
      component.projectGroup.controls.endDate.setValue(new Date());
      component.projectGroup.controls.startDate.setValue(new Date());
      const retValue = component.checkDates(component.projectGroup);
      expect(component.checkDates).toBeTruthy();
      expect(retValue).toEqual({ notValid: true });
    });

    it('onSetDateChange', () => {
      spyOn(component, 'setDateFields');
      component.onSetDateChange();
      expect(component.setDateFields).toHaveBeenCalled();
    });

    it('clearTagetObject', () => {
      component.clearTagetObject();
      expect(component.clearTagetObject).toBeTruthy();
    });

    it('setDateFields', () => {
      component.dateDisable = true;
      component.setDateFields();
    });

    xit('getUsers', () => {
      spyOn(usrSrv, 'getUsers').and.returnValue({ subscribe: () => { return true; } })
      component.getUsers();
      expect(usrSrv.getUsers).toHaveBeenCalled();
      expect(component.getUsers).toBeTruthy();
    });

    it('addProject -add', () => {
      component.buttonAction = ButtonActions.Add
      // spyOn(prjSrv, 'addProject').and.returnValue({ subscribe: () => { } });
      component.addProject();
      // expect(prjSrv.addProject).toHaveBeenCalled();
    });

    it('addProject - update', () => {
      component.buttonAction = ButtonActions.Update
      // spyOn(prjSrv, 'updateProjectById').and.returnValue({ subscribe: () => { } });
      component.addProject();
      // expect(prjSrv.updateProjectById).toHaveBeenCalled();
    });
  });
});
