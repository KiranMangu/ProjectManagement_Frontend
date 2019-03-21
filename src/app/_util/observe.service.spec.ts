import { TestBed } from '@angular/core/testing';

import { ObserveService } from './observe.service';
import { Task } from '../_models/task.model';

describe('ObserveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObserveService = TestBed.get(ObserveService);
    expect(service).toBeTruthy();
  });


  it('editTask', () => {
    const service: ObserveService = TestBed.get(ObserveService);
    const newTask = new Task({
      task: '',
      startDate: new Date(),
      endDate: new Date(),
      status: 'Open',
      priority: 0,
      projectId: '00',
      parentId: '00'
    })
    service.editTask(newTask);
    expect(service.editTask).toBeTruthy();
  })

  it('tabChanged', () => {
    const service: ObserveService = TestBed.get(ObserveService);
    service.tabChanged(0)
    expect(service.tabChanged).toBeTruthy();
  })

});
