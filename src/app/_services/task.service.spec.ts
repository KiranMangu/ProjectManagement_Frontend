import { TestBed, async } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Task } from '../_models/task.model';
import { MatSnackBarModule } from '@angular/material';

describe('TaskService', () => {
  beforeEach(() => TestBed
    .configureTestingModule(
      {
        imports: [
          HttpClientModule,
          MatSnackBarModule
        ]
      }));

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });
});

describe('UserService calls', () => {
  let service, http, newTask;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule(
        {
          imports: [
            HttpClientModule,
            MatSnackBarModule
          ]
        }).compileComponents().then(() => {
          // MyComments: Not being used??
          // inject([TaskService, HttpClient], (service: TaskService, http: HttpClient) => {
          // });
          http = TestBed.get(HttpClient);
          service = TestBed.get(TaskService);

          newTask = new Task({
            task: 'taskName',
            startDate: new Date(new Date().toISOString()),
            endDate: new Date(new Date().toISOString()),
            priority: 0,
            status: 'Open',
            projectId: '000',
            parentId: '000'
          });
        });
  }));

  /////////////////
  it('getTaskById', () => {
    // const http = TestBed.get(HttpClient);
    // const service: UserService = TestBed.get(UserService);
    spyOn(http, 'get').and.returnValue('test');
    const ret = service.getTaskById('0');
    expect(service.getTaskById).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('addTask', () => {
    spyOn(http, 'post').and.returnValue('test');
    const ret = service.addTask(newTask);
    expect(service.addTask).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('updateTaskById', () => {
    spyOn(http, 'put').and.returnValue('test');
    const ret = service.updateTaskById(newTask);
    expect(service.updateTaskById).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('updateTaskStatusToComplete', () => {
    spyOn(http, 'post').and.returnValue('test');
    const ret = service.updateTaskStatusToComplete(newTask);
    expect(service.updateTaskStatusToComplete).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('updateUserProject', () => {
    spyOn(http, 'post').and.returnValue('test');
    const ret = service.updateUserProject(newTask);
    expect(service.updateUserProject).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('updateUserTask', () => {
    spyOn(http, 'post').and.returnValue('test');
    const ret = service.updateUserTask(newTask);
    expect(service.updateUserTask).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('updateUserTask', () => {
    spyOn(http, 'post').and.returnValue('test');
    const ret = service.updateUserTask(newTask);
    expect(service.updateUserTask).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('deleteTask', () => {
    spyOn(http, 'delete').and.returnValue('test');
    const ret = service.deleteTask(newTask);
    expect(service.deleteTask).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('updateParenTsk', () => {
    spyOn(http, 'post').and.returnValue('test');
    const ret = service.updateParenTsk(newTask);
    expect(service.updateParenTsk).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('addParentTask', () => {
    spyOn(http, 'post').and.returnValue('test');
    const ret = service.addParentTask(newTask);
    expect(service.addParentTask).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('getAllParentTasks', () => {
    spyOn(http, 'get').and.returnValue('test');
    const ret = service.getAllParentTasks();
    expect(service.getAllParentTasks).toBeTruthy();
    expect(ret).toEqual('test');
  });

  it('getParentTaskById', () => {
    spyOn(http, 'get').and.returnValue('test');
    const ret = service.getParentTaskById('0');
    expect(service.getParentTaskById).toBeTruthy();
    expect(ret).toEqual('test');
  });
  /////////////////

  it('sort Date - start asc', () => {
    const jsonTest = [
      { 'startDate': '01/02/2019', 'endDate': '01/31/2019' },
      { 'startDate': '02/02/2019', 'endDate': '02/31/2019' }
    ];
    const retValue = jsonTest.sort(service.sortByDate('startDate', 1));
    expect(service.sortByDate).toBeTruthy();
    expect(retValue).toEqual(retValue);
  });

  it('sort Date - start dsc', () => {
    const jsonTest = [
      { 'startDate': '01/02/2019', 'endDate': '01/31/2019' },
      { 'startDate': '02/02/2019', 'endDate': '02/31/2019' }
    ];
    const jsonRevTest = [
      { 'startDate': '02/02/2019', 'endDate': '02/31/2019' },
      { 'startDate': '01/02/2019', 'endDate': '01/31/2019' }
    ];
    const retValue = jsonTest.sort(service.sortByDate('startDate', -1));
    expect(service.sortByDate).toBeTruthy();
    expect(retValue).toEqual(jsonRevTest);
  });

  it('sort Date - start same', () => {
    const jsonTest = [
      { 'startDate': '01/02/2019', 'endDate': '01/31/2019' },
      { 'startDate': '02/02/2019', 'endDate': '02/31/2019' }
    ];
    const retValue = jsonTest.sort(service.sortByDate('startDate', 1));
    expect(service.sortByDate).toBeTruthy();
    expect(retValue).toEqual(retValue);
  });

  it('sort Date - start', () => {
    const jsonTest = [
      { 'endDate': '01/31/2019' },
      { 'startDate': '02/02/2019', 'endDate': '02/31/2019' }
    ];
    const retValue = jsonTest.sort(service.sortByDate('startDate', 1));
    expect(service.sortByDate).toBeTruthy();
    expect(retValue).toEqual(retValue);
  });

  it('sort Date - start', () => {
    const jsonTest = [
      { 'startDate': '01/02/2019', 'endDate': '01/31/2019' },
      { 'endDate': '02/31/2019' }
    ];
    const retValue = jsonTest.sort(service.sortByDate('startDate', 1));
    expect(service.sortByDate).toBeTruthy();
    expect(retValue).toEqual(retValue);
  });

  it('Sort Date - enddate asc', () => {
    const jsonTest = [
      { 'startDate': '01/02/2019', 'endDate': '01/31/2019' },
      { 'startDate': '02/02/2019' }
    ];
    const retValue = jsonTest.sort(service.sortByDate('endDate', 1));
    expect(service.sortByDate).toBeTruthy();
    expect(retValue).toEqual(jsonTest);
  });

  it('Sort Date - enddate asc', () => {
    const jsonTest = [
      { 'startDate': '01/02/2019' },
      { 'startDate': '02/02/2019', 'endDate': '02/31/2019' }
    ];
    const retValue = jsonTest.sort(service.sortByDate('endDate', 1));
    expect(service.sortByDate).toBeTruthy();
    expect(retValue).toEqual(jsonTest);
  });

  it('Sort Date - enddate asc', () => {
    const jsonTest = [
      { 'startDate': '01/02/2019', 'endDate': '01/31/2019' },
      { 'startDate': '02/02/2019', 'endDate': '02/31/2019' }
    ];
    const retValue = jsonTest.sort(service.sortByDate('endDate', 1));
    expect(service.sortByDate).toBeTruthy();
    expect(retValue).toEqual(jsonTest);
  });

  it('sortData - desc', () => {
    const jsonTest = [
      { 'name': 'abc', 'empId': '123' },
      { 'name': 'bcd', 'empId': '124' }
    ];
    const jsonRevTest = [
      { 'name': 'bcd', 'empId': '124' },
      { 'name': 'abc', 'empId': '123' }
    ];
    const retValue = jsonTest.sort(service.sortData('name', -1));
    expect(service.sortData).toBeTruthy();
    expect(retValue).toEqual(jsonRevTest);
  });

  it('sortData - asc', () => {
    const jsonTest = [
      { 'name': 'abc', 'empId': '123' },
      { 'name': 'bcd', 'empId': '124' }
    ];
    const jsonRevTest = [
      { 'name': 'bcd', 'empId': '124' },
      { 'name': 'abc', 'empId': '123' }
    ];
    const retValue = jsonRevTest.sort(service.sortData('name', 1));
    expect(service.sortData).toBeTruthy();
    expect(retValue).toEqual(jsonTest);
  });

  it('sortData - equal', () => {
    const jsonTest = [
      { 'name': 'abc', 'empId': '123' },
      { 'name': 'abc', 'empId': '124' }
    ];
    const retValue = jsonTest.sort(service.sortData('name', 1));
    expect(service.sortData).toBeTruthy();
    expect(retValue).toEqual(jsonTest);
  });

  it('toggleOrder', () => {
    const retValue = service.toggleOrder(1);
    expect(service.toggleOrder).toBeTruthy();
    expect(retValue).toEqual(-1);
  });
});
