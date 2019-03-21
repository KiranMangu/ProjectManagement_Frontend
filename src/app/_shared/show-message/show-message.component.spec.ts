import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMessageComponent } from './show-message.component';
import { MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material';

describe('ShowMessageComponent', () => {
  let component: ShowMessageComponent;
  let fixture: ComponentFixture<ShowMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule
      ],
      declarations: [ShowMessageComponent],
      providers: [{
        provide: MAT_SNACK_BAR_DATA,
        useValue: {}
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
