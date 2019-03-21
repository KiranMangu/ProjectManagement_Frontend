import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserFormComponent } from './user-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule, MatSnackBarModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have user components - Add, View', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-add-user')).toBeTruthy();
    expect(compiled.querySelector('app-view-user')).toBeTruthy();
  })
});

describe('method calls', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule, MatSnackBarModule]
    }).compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('loadUsers', () => {
    spyOn(component, 'loadUsers');
    component.loadUsers();;
    expect(component.loadUsers).toHaveBeenCalled();
    expect(component.loadUsers).toBeTruthy();
  });

  it('reloadView', () => {
    const palyLoad = '000';
    spyOn(component, 'loadUsers');
    component.reloadView(palyLoad);;
    expect(component.loadUsers).toHaveBeenCalled();
    expect(component.reloadView).toBeTruthy();
  });

  it('updateUser', () => {
    const userId = '000'
    component.updateUser(userId);
    expect(component.userId).toEqual(userId);
  });
});