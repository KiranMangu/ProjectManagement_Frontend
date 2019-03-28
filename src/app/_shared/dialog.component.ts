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
  filteredData: any;
  searchKey: String;
  // MyComments: Inject in constructor
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailogData) {
    this.filteredData = this.data;
    // console.log('data');
    // console.log(data);
  }

  search(): void {
    // console.log(this.filteredData);
    if (this.searchKey === undefined || this.searchKey.trim() === '') {
      this.filteredData = this.data;
    } else {
      this.filteredData.data.list =
      this.filteredData.data.list.filter(item => item.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) !== -1);
    }
    // console.log(this.filteredData.data.list);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectedItem(item: any): void {
    this.dialogRef.close(item);
  }
}
