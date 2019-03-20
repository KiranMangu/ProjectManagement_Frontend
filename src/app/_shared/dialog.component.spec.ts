import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { MatDialogModule, MatRadioModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

xdescribe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatRadioModule,
        FormsModule
      ],
      declarations: [DialogComponent],
      providers: [MatDialogRef, MAT_DIALOG_DATA]
    })
      .compileComponents();
  }));

  TestBed.overrideModule(BrowserDynamicTestingModule, {
    set: {
      entryComponents: [DialogComponent]
    }
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
