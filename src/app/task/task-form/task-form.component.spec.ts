import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule
      ],
      declarations: [TaskFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
