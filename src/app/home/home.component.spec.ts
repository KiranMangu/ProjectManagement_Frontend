import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { element } from '@angular/core/src/render3';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have tab - Add Project', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-tab[label="Add Project"]')).toBeTruthy();
    expect(compiled.querySelector('mat-tab[label="Add Task"]')).toBeTruthy();
    expect(compiled.querySelector('mat-tab[label="User"]')).toBeTruthy();
    expect(compiled.querySelector('mat-tab[label="View Task"]')).toBeTruthy();


  });

  it('should have user component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-user-form')).toBeTruthy();
  });

});
