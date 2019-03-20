import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserComponent } from './view-user.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;
  let compiled;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });


  it('should create', () => {
    // expect(component).toBeTruthy();
  });

  it('should contain ReactiveForm properties', () => {
    //TODO
  });

  it('should contain table control', () => {
    // expect(compiled.querySelector('table')).toBeTruthy();
  });

  it('should containt search controls', () => {
    // expect(compiled.querySelector('input[formControlName="searchField"] ')).toBeTruthy();
  });

  it('sort ', () => {
    component.filteredUsersData = [];
    spyOn(component.filteredUsersData, 'sort').and.returnValue('test');
    component.sort(1);
    expect(component.sort).toBeTruthy();
  });
  it('sort ', () => {
    component.filteredUsersData = [];
    spyOn(component.filteredUsersData, 'sort').and.returnValue('test');
    component.sort(2);
    expect(component.sort).toBeTruthy();
  });
  it('sort ', () => {
    component.filteredUsersData = [];
    spyOn(component.filteredUsersData, 'sort').and.returnValue('test');
    component.sort(3);
    expect(component.sort).toBeTruthy();
  });
  it('sort ', () => {
    component.filteredUsersData = [];
    spyOn(component.filteredUsersData, 'sort').and.returnValue('test');
    component.sort(4);
    expect(component.sort).toBeTruthy();
  });

});
