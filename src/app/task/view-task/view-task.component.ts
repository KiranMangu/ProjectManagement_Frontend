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

  data: Project[] = [
    {
      project: 'project_1', projectId: 'A12', endDate: new Date('01/01/2019'),
      startDate: new Date('12/11/2019'), status: 'Completed', priority: 1, manager: 'User 1'
    },
    {
      project: 'project_2', projectId: 'A7', endDate: new Date('01/01/2019'),
      startDate: new Date('12/11/2019'), status: 'Completed', priority: 1, manager: 'User 1'
    },
    {
      project: 'project_3', projectId: 'A1', endDate: new Date('01/01/2019'),
      startDate: new Date('12/11/2019'), status: 'Completed', priority: 1, manager: 'User 1'
    }
  ];

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
