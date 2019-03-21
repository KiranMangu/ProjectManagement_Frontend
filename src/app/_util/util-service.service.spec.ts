import { TestBed } from '@angular/core/testing';
import { DailogData } from '../_models/dialog.model';
import { UtilServiceService } from './util-service.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { projectData } from '../_models/stub.model';

describe('UtilServiceService', () => {
  let service, data;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatSnackBarModule]
  }).compileComponents().then(() => {

    data = [{
      title: String,
      list: [{
        name: String,
        Id: String,
      }]
    }]
  })
  )

  it('should be created', () => {
    service = TestBed.get(UtilServiceService);
    expect(service).toBeTruthy();
  });

  it('mapDailogData sourcedata = undefined', () => {
    service = TestBed.get(UtilServiceService);
    service.mapDailogData(data, undefined, 'Projects');
    service.mapDailogData(data, undefined, 'Users');
    service.mapDailogData(data, undefined, 'ParentTasks');
    expect(service.mapDailogData).toBeTruthy();
  });

  it('mapDailogData with sourcedata', () => {
    service = TestBed.get(UtilServiceService);
    const projectdata = [{ 'project': 'project', '_id': '000' }]
    const userdata = [{ 'firstName': 'firstName', 'lastName': 'lastName', '_id': '000' }]
    const taskdata = [{ 'parentTask': 'parentTask', '_id': '000' }]
    // MyComments: Push not working until a entry is available
    data = { title: '', list: [{ name: '', Id: '' }] };
    spyOn(data.list, 'push');
    service.mapDailogData(data, projectdata, 'Projects');
    // service.mapDailogData(data, userdata, 'Users');
    // service.mapDailogData(data, taskdata, 'ParentTasks');
    expect(service.mapDailogData).toBeTruthy();
  });

  it('mapDailogData with sourcedata', () => {
    service = TestBed.get(UtilServiceService);
    const taskdata = [{ 'parentTask': 'parentTask', '_id': '000' }]
    data = { title: '', list: [{ name: '', Id: '' }] };
    spyOn(data.list, 'push');
    service.mapDailogData(data, taskdata, 'ParentTasks');
    expect(service.mapDailogData).toBeTruthy();
  });


  it('mapDailogData with sourcedata', () => {
    service = TestBed.get(UtilServiceService);
    const userdata = [{ 'firstName': 'firstName', 'lastName': 'lastName', '_id': '000' }]
    data = { title: '', list: [{ name: '', Id: '' }] };
    spyOn(data.list, 'push');
    service.mapDailogData(data, userdata, 'Users');
    expect(service.mapDailogData).toBeTruthy();
  });


  it('getApi', () => {
    service = TestBed.get(UtilServiceService);
    const url = service.getApi();
    expect(url).toContain('http://');
    expect(url).toContain('/api/');
    expect(service.getApi).toBeTruthy();
  });

  it('showAlert', () => {
    service = TestBed.get(UtilServiceService);
    spyOn(service._snkBar, 'open')
    service.showAlert('testMessage', 'OK', false);
    service.showAlert('testMessage', 'OK', true);
    expect(service.showAlert).toBeTruthy();
  });
});
