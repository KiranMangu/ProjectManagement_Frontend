import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserComponent } from './view-user.component';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;
  let compiled;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserComponent]
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
    expect(component).toBeTruthy();
  });

  it('should contain ReactiveForm properties', () => {
    //TODO
  });

  it('should contain table control', () => {
    expect(compiled.querySelector('table')).toBeTruthy();
  });

  it('should containt search controls', () => {
    expect(compiled.querySelector('input[formControlName="searchField"] ')).toBeTruthy();
  });
});
