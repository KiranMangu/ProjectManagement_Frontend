import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, inject, SimpleChange } from '@angular/core';
import { AddUserComponent } from './add-user.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { UserService } from '../../_services/user.service';
import { ButtonActions, User } from '../../_models/user.model';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule
      ], // MyComments: For inclusion of Reactive Forms in Unit test
      declarations: [AddUserComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // MyComments: For inclusion of non standard angular Schema (material tags)
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain controls - First Name, Last Name & Employee Id', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[formControlName="firstName"]')).toBeTruthy();
    expect(compiled.querySelector('input[formControlName="lastName"]')).toBeTruthy();
    expect(compiled.querySelector('input[formControlName="employeeId"]')).toBeTruthy();
  });

  it('should contain function Component functions', () => {
    expect(component.ngOnInit).toBeDefined();
  });

  it('should contain ReactiveForm properties, ', () => {
    expect(component.userAddGrp).toBeDefined();
  });

  it('should containt ReactiveForm methods', () => {
    expect(component.addUser).toBeDefined();
  });

  it('should contain function resetFields() ', () => {
    expect(component.resetFields).toBeDefined();
  });
});

describe('AddUserComponent: Call user functions', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let cmpInstace;
  let userService;
  let _snkBar;
  let change
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
      ], // MyComments: For inclusion of Reactive Forms in Unit test
      declarations: [AddUserComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [UserService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    cmpInstace = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    userService = debugElement.injector.get(UserService);
    _snkBar == debugElement.injector.get(MatSnackBar);
  }));

  it('resetFields()', () => {
    spyOn(cmpInstace, 'resetFields');
    cmpInstace.resetFields();
    expect(cmpInstace.resetFields).toHaveBeenCalled();
  });

  it('adduser', () => {
    cmpInstace.ngOnInit();
    cmpInstace.userAddGrp.controls.firstName.setValue('firstName');
    cmpInstace.userAddGrp.controls.lastName.setValue('lastName');
    cmpInstace.userAddGrp.controls.employeeId.setValue('Emp000');
    var temp = new User({ firstName: '11', lastName: '11', employeeId: '11' });
    // spyOn(userService, 'addUser').and.callFake((arguments) => { });
    // spyOn(userService, 'addUser').and.callFake((temp) => { });
    spyOn(cmpInstace, 'refreshData');
    spyOn(userService, 'addUser').and.returnValue({ subscribe: () => { cmpInstace.refreshData() } });
    cmpInstace.addUser(ButtonActions.Submit);
    expect(cmpInstace.refreshData).toHaveBeenCalled();
    expect(userService.addUser).toHaveBeenCalled();
  });

  it('Update user By Id', () => {
    cmpInstace.ngOnInit();
    cmpInstace.userAddGrp.firstName = 'firstName';
    cmpInstace.userAddGrp.lastName = 'lastName';
    cmpInstace.userAddGrp.employeeId = 'Emp000';
    var temp = new User({ firstName: '11', lastName: '11', employeeId: '11' });
    spyOn(cmpInstace, 'refreshData');
    spyOn(userService, 'updateUserById').and.returnValue({ subscribe: () => { cmpInstace.refreshData() } })
    cmpInstace.addUser(ButtonActions.Update);
    expect(cmpInstace.refreshData).toHaveBeenCalled();
    expect(userService.updateUserById).toHaveBeenCalled();
  });

  it('NgOnchanges', () => {
    cmpInstace.ngOnChanges({
      data: new SimpleChange('prevValue', 'currencValue', true),
    });
    expect(cmpInstace.updateUserId).toEqual("currencValue");
    expect(cmpInstace.buttonAction).toEqual(ButtonActions.Submit);
  });

  xit('refreshData', () => {
    spyOn(component.form, 'resetForm');
    cmpInstace.refreshData();
  });

});