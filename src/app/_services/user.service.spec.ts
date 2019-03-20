import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { User } from '../_models/user.model';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

});

describe('UserService calls', () => {
  let service, http;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserService]
    }).compileComponents().then(() => {
      // MyComments: Not being used??
      inject([UserService, HttpClient], (service: UserService, http: HttpClient) => {
      });
      http = TestBed.get(HttpClient);
      service = TestBed.get(UserService);
    });
  }));

  it('get all users', () => {
    // const http = TestBed.get(HttpClient);
    // const service: UserService = TestBed.get(UserService);
    spyOn(http, 'get').and.returnValue('test');
    const ret = service.getUserById('0');
    expect(service.getUserById).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('add users', () => {
    spyOn(http, 'post').and.returnValue('test');
    const ret = service.addUser(new User({
      firstName: 'firstName',
      lastName: 'lastName',
      employeeId: 'emp001'
    }));
    expect(service.addUser).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('Update By Id', () => {
    spyOn(http, 'put').and.returnValue('test');
    const ret = service.updateUserById(new User({
      firstName: 'firstName',
      lastName: 'lastName',
      employeeId: 'emp001'
    }));
    expect(service.addUser).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('updateUserProjectAndTask', () => {
    spyOn(http, 'post').and.returnValue('test');
    const ret = service.updateUserProjectAndTask(new User({
      firstName: 'firstName',
      lastName: 'lastName',
      employeeId: 'emp001'
    }));
    expect(service.addUser).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('updateUserProject', () => {
    spyOn(http, 'post').and.returnValue('test');
    const ret = service.updateUserProject(new User({
      firstName: 'firstName',
      lastName: 'lastName',
      employeeId: 'emp001'
    }));
    expect(service.addUser).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('updateUserTask', () => {
    spyOn(http, 'post').and.returnValue('test');
    const ret = service.updateUserTask(new User({
      firstName: 'firstName',
      lastName: 'lastName',
      employeeId: 'emp001'
    }));
    expect(service.addUser).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('deleteUser', () => {
    spyOn(http, 'delete').and.returnValue('test');
    const ret = service.deleteUser(new User({
      firstName: 'firstName',
      lastName: 'lastName',
      employeeId: 'emp001'
    }));
    expect(service.addUser).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('sortData - desc', () => {
    const jsonTest = [
      { 'name': 'abc', 'empId': '123' },
      { 'name': 'bcd', 'empId': '124' },
    ]
    const jsonRevTest = [
      { 'name': 'bcd', 'empId': '124' },
      { 'name': 'abc', 'empId': '123' },
    ]
    const retValue = jsonTest.sort(service.sortData('name', -1));
    expect(service.sortData).toBeTruthy();
    expect(retValue).toEqual(jsonRevTest);
  });

  it('sortData - asc', () => {
    const jsonTest = [
      { 'name': 'abc', 'empId': '123' },
      { 'name': 'bcd', 'empId': '124' },
    ]
    const jsonRevTest = [
      { 'name': 'bcd', 'empId': '124' },
      { 'name': 'abc', 'empId': '123' },
    ]
    const retValue = jsonRevTest.sort(service.sortData('name', 1));
    expect(service.sortData).toBeTruthy();
    expect(retValue).toEqual(jsonTest);
  });

  it('sortData - equal', () => {
    const jsonTest = [
      { 'name': 'abc', 'empId': '123' },
      { 'name': 'abc', 'empId': '124' },
    ]
    const retValue = jsonTest.sort(service.sortData('name', 1));
    expect(service.sortData).toBeTruthy();
    expect(retValue).toEqual(jsonTest);
  })

  it('toggleOrder', () => {
    const retValue = service.toggleOrder(1);
    expect(service.toggleOrder).toBeTruthy();
    expect(retValue).toEqual(-1);
  })

})
