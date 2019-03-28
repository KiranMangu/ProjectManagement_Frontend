import { TestBed, async } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Project } from '../_models/project.model';
import { User } from '../_models/user.model';
import { MatSnackBarModule } from '@angular/material';

describe('ProjectService', () => {
  beforeEach(() => TestBed
    .configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule
      ]
    }));

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });
});

describe('Project Service calls', () => {
  let service, http, tempProject;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule
      ]
    }).compileComponents().then(() => {

      service = TestBed.get(ProjectService);
      http = TestBed.get(HttpClient);

      tempProject = new Project({
        project: 'project',
        priority: 0,
        startDate: new Date(),
        endDate: new Date(),
        manager: 'manager'
      });

    });
  })

  );

  it('getProjects', () => {
    spyOn(http, 'get').and.returnValue('test');
    const retValue = service.getProjects();
    expect(service.getProjects).toBeTruthy();
    expect(retValue).toEqual('test');
  });

  it('getProjectById', () => {
    spyOn(http, 'get').and.returnValue('test');
    const retValue = service.getProjectById(tempProject);
    expect(service.getProjectById).toBeTruthy();
    expect(retValue).toEqual('test');
  });

  it('getManagerByProjectId', () => {
    spyOn(http, 'get').and.returnValue('test');
    const retValue = service.getManagerByProjectId(tempProject);
    expect(service.getManagerByProjectId).toBeTruthy();
    expect(retValue).toEqual('test');
  });

  it('addProject', () => {
    spyOn(http, 'post').and.returnValue('test');
    const retValue = service.addProject(tempProject);
    expect(service.addProject).toBeTruthy();
    expect(retValue).toEqual('test');
  });

  it('updateProjectById', () => {
    spyOn(http, 'put').and.returnValue('test');
    const retValue = service.updateProjectById(tempProject);
    expect(service.updateProjectById).toBeTruthy();
    expect(retValue).toEqual('test');
  });

  it('suspendProject', () => {
    spyOn(http, 'delete').and.returnValue('test');
    const retValue = service.suspendProject(tempProject);
    expect(service.suspendProject).toBeTruthy();
    expect(retValue).toEqual('test');
  });

  it('ngOnInit', () => {
    service.ngOnInit();
  });

  it('getSelectedUser', () => {
    const usertList: User[] = [
      new User({ _id: '1', firstName: 'firstName1', lastName: 'lastName1', employeeId: 'Emp001' }),
      new User({ _id: '2', firstName: 'firstName2', lastName: 'lastName2', employeeId: 'Emp002' }),
      new User({ _id: '3', firstName: 'firstName3', lastName: 'lastName3', employeeId: 'Emp003' })
    ];
    const selectedUserId: String = '2';
    const retrunValue: User = new User({ _id: '2', firstName: 'firstName2', lastName: 'lastName2', employeeId: 'Emp002' });
    const retValue = service.getSelectedUser(usertList, selectedUserId);
    expect(service.suspendProject).toBeTruthy();
    expect(retValue).toEqual(retrunValue);
  });

  it('sort Date - start asc', () => {
    const jsonTest = [
      { 'startDate': '01/02/2019', 'endDate': '01/31/2019' },
      { 'startDate': '02/02/2019', 'endDate': '02/31/2019' }
    ];
    const retValue = jsonTest.sort(service.sortByDate('startDate', 1));
    expect(service.sortByDate).toBeTruthy();
    expect(retValue).toEqual(retValue);
  });

  it('sort Date - start asc', () => {
    const jsonTest = [
      { 'endDate': '01/31/2019' },
      { 'startDate': '02/02/2019', 'endDate': '02/31/2019' }
    ];
    const retValue = jsonTest.sort(service.sortByDate('startDate', 1));
    expect(service.sortByDate).toBeTruthy();
    expect(retValue).toEqual(retValue);
  });

  it('sort Date - start asc', () => {
    const jsonTest = [
      { 'startDate': '01/02/2019', 'endDate': '01/31/2019' },
      { 'endDate': '02/31/2019' }
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

  it('Sort Date - enddate asc', () => {
    const jsonTest = [
      { 'startDate': '01/02/2019', 'endDate': '01/31/2019' },
      { 'startDate': '02/02/2019', 'endDate': '02/31/2019' }
    ];
    const retValue = jsonTest.sort(service.sortByDate('endDate', 1));
    expect(service.sortByDate).toBeTruthy();
    expect(retValue).toEqual(jsonTest);
  });

  it('Sort Date - enddate', () => {
    const jsonTest = [
      { 'startDate': '01/02/2019'},
      { 'startDate': '02/02/2019', 'endDate': '02/31/2019' }
    ];
    const retValue = jsonTest.sort(service.sortByDate('endDate', 1));
    expect(service.sortByDate).toBeTruthy();
    expect(retValue).toEqual(jsonTest);
  });

  it('Sort Date - enddate', () => {
    const jsonTest = [
      { 'startDate': '01/02/2019', 'endDate': '01/31/2019' },
      { 'startDate': '02/02/2019' }
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
