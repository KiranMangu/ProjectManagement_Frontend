import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserFormComponent } from './user-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';
import { UserService } from 'src/app/_services/user.service';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let usrSrv;
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
    const debugElement = fixture.debugElement;
    usrSrv = debugElement.injector.get(UserService);
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


  describe('method calls', () => {

    beforeEach(async(() => {
    }));

   it('loadUsers', () => {
      spyOn(usrSrv, 'getUsers').and.returnValue({ subscribe: () => { } });
      component.loadUsers();
      // expect(component.loadUsers).toBeTruthy();
      expect(usrSrv.getUsers).toHaveBeenCalled();
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
});
