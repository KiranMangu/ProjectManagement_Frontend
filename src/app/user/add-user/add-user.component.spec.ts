import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AddUserComponent } from './add-user.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], // MyComments: For inclusion of Reactive Forms in Unit test
      declarations: [AddUserComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // MyComments: For inclusion of non standard angular Schema (material tags)
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain controls - First Name, Last Name & Employee Id', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[formControlName="firstName"]')).toBeTruthy();
    expect(compiled.querySelector('input[formControlName="lastName"]')).toBeTruthy();
    expect(compiled.querySelector('input[formControlName="employeeId"]')).toBeTruthy();
  });

  it('should contain function Component functions, ', () => {
    expect(component.ngOnInit).toBeDefined();
  });

  it('should contain ReactiveForm properties, ', () => {
    expect(component.userAddGrp).toBeDefined();
  });

  it('should containt ReactiveForm methods', () => {
    expect(component.addUser).toBeDefined();
  });

  it('should contain function resetFields(), ', () => {
    expect(component.resetFields).toBeDefined();
  });
});
