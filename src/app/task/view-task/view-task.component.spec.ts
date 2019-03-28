import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ViewTaskComponent } from './view-task.component';
import {
  MatFormFieldModule, MatDividerModule, MatCardModule, MatDialogActions, MatDialogModule,
  MatInputModule, MatSnackBarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Task } from '../../_models/task.model';
import { Observable } from 'rxjs';
import { ObserveService } from '../../_util/observe.service';
import { TaskService } from '../../_services/task.service';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let obSrv, tskSrv;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTaskComponent],
      imports: [
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatDialogModule,
        MatCardModule,
        MatSnackBarModule
      ],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    obSrv = debugElement.injector.get(ObserveService);
    tskSrv = debugElement.injector.get(TaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('method calls', () => {
    let priorityRev, stRev;
    beforeEach(() => {
      component.filteredTasksList = [
        { endDate: new Date(), startDate: new Date(), task: 'task1', priority: 1, parentId: 'pId001', status: 'Open', projectId: 'prj001' },
        {
          endDate: new Date(), startDate: new Date(), task: 'task2', priority: 2, parentId: 'pId002', status: 'Completed',
          projectId: 'prj002'
        },
        { endDate: new Date(), startDate: new Date(), task: 'task3', priority: 3, parentId: 'pId003', status: 'Open', projectId: 'prj003' },
        {
          endDate: new Date(), startDate: new Date(), task: 'task4', priority: 4, parentId: 'pId004', status: 'Completed',
          projectId: 'prj004'
        },
        { endDate: new Date(), startDate: new Date(), task: 'task5', priority: 5, parentId: 'pId005', status: 'Open', projectId: 'prj005' },
      ];
      priorityRev = [
        { endDate: new Date(), startDate: new Date(), task: 'task5', priority: 5, parentId: 'pId005', status: 'Open', projectId: 'prj005' },
        {
          endDate: new Date(), startDate: new Date(), task: 'task4', priority: 4, parentId: 'pId004', status: 'Completed',
          projectId: 'prj004'
        },
        {
          endDate: new Date(), startDate: new Date(), task: 'task3', priority: 3, parentId: 'pId003', status: 'Open',
          projectId: 'prj003'
        },
        {
          endDate: new Date(), startDate: new Date(), task: 'task2', priority: 2, parentId: 'pId002', status: 'Completed',
          projectId: 'prj002'
        },
        { endDate: new Date(), startDate: new Date(), task: 'task1', priority: 1, parentId: 'pId001', status: 'Open', projectId: 'prj001' },
      ];
      stRev = [
        { endDate: new Date(), startDate: new Date(), task: 'task1', priority: 1, parentId: 'pId001', status: 'Open', projectId: 'prj001' },
        { endDate: new Date(), startDate: new Date(), task: 'task3', priority: 3, parentId: 'pId003', status: 'Open', projectId: 'prj003' },
        { endDate: new Date(), startDate: new Date(), task: 'task5', priority: 5, parentId: 'pId005', status: 'Open', projectId: 'prj005' },
        {
          endDate: new Date(), startDate: new Date(), task: 'task2', priority: 2, parentId: 'pId002', status: 'Completed',
          projectId: 'prj002'
        },
        {
          endDate: new Date(), startDate: new Date(), task: 'task4', priority: 4, parentId: 'pId004', status: 'Completed', projectId:
            'prj004'
        },
      ];
      component.copyTasksList = component.filteredTasksList;
    });

    it('sort - start Date', () => {
      component.stSortToggle = 1;
      component.sort(1);
      expect(component.filteredTasksList).toEqual(component.filteredTasksList);
    });

    it('sort - end date', () => {
      component.edSortToggle = 1;
      component.sort(2);
      expect(component.filteredTasksList).toEqual(component.filteredTasksList);
    });

    it('sort - priority', () => {
      component.priSortToggle = 1;
      component.sort(3);
      expect(priorityRev).toEqual(component.filteredTasksList);
    });

    it('sort- status', () => {
      component.sdSortToggle = 1;
      component.sort(4);
      expect(stRev).toEqual(component.filteredTasksList);
    });

    it('sort - clear sort criteria', () => {
      component.sort(5);
      expect(component.copyTasksList).toEqual(component.filteredTasksList);
    });

    it('editTask', () => {
      const tempTask = new Task({
        task: 'task',
        startDate: new Date(),
        endDate: new Date(),
        priority: 0,
      });
      spyOn(obSrv, 'editTask');
      component.editTask(tempTask);
      expect(obSrv.editTask).toHaveBeenCalled();
    });

    it('endTask', () => {
      spyOn(tskSrv, 'updateTaskStatusToComplete').and.returnValue({ subscribe: () => { } });
      component.endTask('000');
      expect(tskSrv.updateTaskStatusToComplete).toHaveBeenCalled();
      expect(component.endTask).toBeTruthy();
    });

    xit('openDialog', () => {
      component.openDialog();
    })
  });
});
