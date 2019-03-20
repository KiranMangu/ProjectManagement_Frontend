import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Project } from '../_models/project.model';
import { DailogData } from '../_models/dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  dataSelected: String;
  // MyComments: Inject in constructor
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailogData) {
    console.log('data');
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectedItem(item: any): void {
    this.dialogRef.close(item);
  }
}
