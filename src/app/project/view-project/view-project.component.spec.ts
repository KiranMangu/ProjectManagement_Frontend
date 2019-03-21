import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectComponent } from './view-project.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
});
