import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../shared/dialog.component';
import { MatDialog } from '@angular/material';
import { Project } from 'src/app/model/project.model';
import { UtilServiceService } from '../../util/util-service.service';
import { DailogData } from 'src/app/model/dialog.model';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

   targetData: DailogData = {
    title: '',
    list: [{
      name: '',
      Id: ''
    }]
  };

  data: Project[] ;

  constructor(private dialog: MatDialog, private src: UtilServiceService) { }

  ngOnInit() {
    this.src.mapDailogData(this.targetData, this.data, 'Project');
    console.log('this.targetDate');
    console.log(this.targetData);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: this.targetData.title, data: this.targetData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
