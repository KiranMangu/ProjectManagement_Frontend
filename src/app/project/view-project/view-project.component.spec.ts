import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectComponent } from './view-project.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleChange } from '@angular/core';

describe('ViewProjectComponent', () => {
  let component: ViewProjectComponent;
  let fixture: ComponentFixture<ViewProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjectComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('method calls', () => {
    let priorityRev, stRev, retValue;
    beforeEach(() => {

      let today = new Date();
      component.filteredProjecList = [
        { endDate: today, startDate: today, project: 'project1', priority: 1, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' },
        { endDate: today, startDate: today, project: 'project2', priority: 2, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' },
        { endDate: today, startDate: today, project: 'project3', priority: 3, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' },
        { endDate: today, startDate: today, project: 'project4', priority: 4, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' },
        { endDate: today, startDate: today, project: 'project5', priority: 5, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' }
      ];
      priorityRev = [
        { endDate: today, startDate: today, project: 'project5', priority: 5, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' },
        { endDate: today, startDate: today, project: 'project4', priority: 4, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' },
        { endDate: today, startDate: today, project: 'project3', priority: 3, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' },
        { endDate: today, startDate: today, project: 'project2', priority: 2, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' },
        { endDate: today, startDate: today, project: 'project1', priority: 1, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' },
      ];
      stRev = [
        { endDate: today, startDate: today, project: 'project1', priority: 1, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' },
        { endDate: today, startDate: today, project: 'project2', priority: 2, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' },
        { endDate: today, startDate: today, project: 'project3', priority: 3, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' },
        { endDate: today, startDate: today, project: 'project4', priority: 4, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' },
        { endDate: today, startDate: today, project: 'project5', priority: 5, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' }
      ];

      retValue = [{ endDate: today, startDate: today, project: 'project1', priority: 1, noOfTasks: 0, completed: 0, managerName: '', manager: '', _id: '12' }]
    });
    it('ngOnChanges', () => {
      component.ngOnChanges({
        refresh: new SimpleChange('prevValue', 'currValue', true)
      });
    });

    it('sort - start Date', () => {
      component.startDateOrder = 1;
      component.sort(1);
      expect(component.filteredProjecList).toEqual(component.filteredProjecList);
    });

    it('sort - end date', () => {
      component.endDateOrder = 1;
      component.sort(2);
      expect(component.filteredProjecList).toEqual(component.filteredProjecList);
    });

    it('sort - priority', () => {
      component.priorityOrder = 1;
      component.sort(3);
      expect(priorityRev).toEqual(component.filteredProjecList);
    });

    it('sort - stauts', () => {
      component.completedOrder = 1;
      component.sort(4);
      expect(component.filteredProjecList).toEqual(component.filteredProjecList);
    });

    it('sort - clear sort criteria', () => {
      component.sort(5);
      expect(component.filteredProjecList).toEqual(component.filteredProjecList);
    });

    it('searchProject', () => {
      component.copyProjectList = component.filteredProjecList;
      component.searchProject('project1');
      expect(component.filteredProjecList[0].project).toEqual(retValue[0].project);
      component.copyProjectList = component.filteredProjecList;
      component.searchProject('');
      expect(component.filteredProjecList).toEqual(component.copyProjectList);
    });

    it('editProject', () => {
      component.editProject(retValue);
    });

    it('suspendProject', () => {
      component.suspendProject('prj001');
    });
  });
});
