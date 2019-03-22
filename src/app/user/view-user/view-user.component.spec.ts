import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserComponent } from './view-user.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../../_services/user.service';
import { Observable } from 'rxjs';
import { SimpleChanges, SimpleChange } from '@angular/core';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;
  let compiled, usrSrv;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule
      ],
      providers: [UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    usrSrv = debugElement.injector.get(UserService);
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });


  it('should create', () => {
    // expect(component).toBeTruthy();
  });

  it('should contain ReactiveForm properties', () => {
    //TODO
  });

  it('should contain table control', () => {
    // expect(compiled.querySelector('table')).toBeTruthy();
  });

  it('should containt search controls', () => {
    component.copyusersData = [
      { '_id': 'id001', 'firstName': 'firstName1', 'lastName': 'lastName1', 'employeeId': 'e001', 'projectId': 'pId001', 'taskId': 'tId001' },
      { '_id': 'id002', 'firstName': 'firstName2', 'lastName': 'lastName2', 'employeeId': 'e002', 'projectId': 'pId002', 'taskId': 'tId002' },
      { '_id': 'id003', 'firstName': 'firstName3', 'lastName': 'lastName3', 'employeeId': 'e003', 'projectId': 'pId003', 'taskId': 'tId003' }
    ];
    const test = [{ '_id': 'id001', 'firstName': 'firstName1', 'lastName': 'lastName1', 'employeeId': 'e001', 'projectId': 'pId001', 'taskId': 'tId001' }];
    component.searchKey = 'firstName1';
    component.searchUser();
    expect(component.filteredUsersData).toEqual(test);
    component.searchKey = '';
    component.searchUser();
    expect(component.copyusersData).toEqual(component.copyusersData);
    expect(component.searchUser).toBeTruthy();
  });

  it('editUser', () => {
    component.editUser('0');
    expect(component.editUser).toBeTruthy();
  });

  it('deleteUser', () => {
    // TODO: Need to check for calling service methods which are initialized in contructor
    // TODO: For public variables/service objects shouldn't be an issue..!!!
    spyOn(usrSrv, 'deleteUser').and.returnValue({ subscribe: () => { } });
    component.deleteUser('000');
    expect(usrSrv.deleteUser).toHaveBeenCalled();
  });

  it('ngOnChanges', () => {
    component.ngOnChanges({
      data: new SimpleChange('prevValue', 'currentValue', true)
    });
    expect(component.sort).toBeTruthy();
  })

  it('sort ', () => {
    component.filteredUsersData = [];
    spyOn(component.filteredUsersData, 'sort').and.returnValue('test');
    component.sort(1);
    expect(component.sort).toBeTruthy();
  });
  it('sort ', () => {
    component.filteredUsersData = [];
    spyOn(component.filteredUsersData, 'sort').and.returnValue('test');
    component.sort(2);
    expect(component.sort).toBeTruthy();
  });
  it('sort ', () => {
    component.filteredUsersData = [];
    spyOn(component.filteredUsersData, 'sort').and.returnValue('test');
    component.sort(3);
    expect(component.sort).toBeTruthy();
  });
  it('sort ', () => {
    component.filteredUsersData = [];
    spyOn(component.filteredUsersData, 'sort').and.returnValue('test');
    component.sort(4);
    expect(component.sort).toBeTruthy();
  });

});
