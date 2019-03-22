import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
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

  it('onNoClick', () => {
    component.onNoClick();
  });
});

/** let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialog, overlayContainer;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatRadioModule,
        FormsModule
      ],
      declarations: [DialogComponent],
      providers: [MatDialogRef, MAT_DIALOG_DATA]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DialogComponent]
      }
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([MatDialog, OverlayContainer],
    (d: MatDialog, oc: OverlayContainer) => {
      dialog = d;
      overlayContainer = oc;
    }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should create', () => {
    const dialogRef = dialog.open(DialogComponent, {
      data: { param: '1' }
    });

    // verify
    expect(dialogRef.component instanceof DialogComponent).toBe(true);
    // expect(component).toBeTruthy();
  });

  it('onNoClick', () => {
    component.onNoClick();
  }); */