import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DialogComponent } from '../../shared/dialog.component';
import { MatDialog } from '@angular/material';
import { Project } from 'src/app/model/project.model';
import { UtilServiceService } from '../../util/util-service.service';
import { DailogData } from 'src/app/model/dialog.model';
import { Task, TaskView, ParentTask } from 'src/app/model/task.model';
import { TaskService } from '../../service/task.service';
import { ObserveService } from '../../util/observe.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {


  TasksList: Task[];
  filteredTasksList: TaskView[];
  copyTasksList: TaskView[];
  projectList: Project[];
  // parentList: ParentTask[];
  parentList: any;
  sdSortToggle: number = 1;
  edSortToggle: number = 1;
  priSortToggle: number = 1;
  stSortToggle: number = 1;
  targetData: DailogData = {
    title: '',
    list: [{
      name: '',
      Id: ''
    }]
  };

  @Output() editSelectedTask = new EventEmitter<any>();

  data: Project[];

  constructor(private dialog: MatDialog, private src: UtilServiceService, private _tskSrv: TaskService,
    private _obsSrv: ObserveService) { }

  ngOnInit() {
    this.src.mapDailogData(this.targetData, this.data, 'Project');
    // console.log('this.targetDate');
    // console.log(this.targetData);
    // this.getParentTasks();
    this.loadTasks();
    // this._tskSrv.mapParentIdToName(this.filteredTasksList, this.parentList);
    this.copyTasksList = this.filteredTasksList;
  }

  getParentTasks(): void {
    this._tskSrv.getAllParentTasks()
      .subscribe((parentTasks) => {
        // console.log('parentTasks' + parentTasks);
        this.parentList = parentTasks;
        // console.log(parentTasks);
        if (this.parentList !== undefined) {
          this._tskSrv.mapParentIdToName(this.filteredTasksList, this.parentList);
        }
      },
        (error) => {
          console.log('Failed getting Parent Tasks' + error);
        });
  }

  sort(param: Number): void {
    if (param === 1) {
      this.sdSortToggle = this._tskSrv.toggleOrder(this.sdSortToggle);
      this.filteredTasksList.sort(this._tskSrv.sortByDate('startDate', this.sdSortToggle));
    }
    else if (param === 2) {
      this.edSortToggle = this._tskSrv.toggleOrder(this.edSortToggle);
      this.filteredTasksList.sort(this._tskSrv.sortByDate('endDate', this.edSortToggle));
    }
    else if (param === 3) {
      this.priSortToggle = this._tskSrv.toggleOrder(this.priSortToggle);
      this.filteredTasksList.sort(this._tskSrv.sortData('priority', this.priSortToggle));
    }
    else if (param === 4) {
      this.stSortToggle = this._tskSrv.toggleOrder(this.stSortToggle);
      this.filteredTasksList.sort(this._tskSrv.sortData('status', this.stSortToggle));
    }
    else {
      this.filteredTasksList = this.copyTasksList;
    }
  }

  editTask(task): void {
    console.log('edit task');
    console.log(task);
    this._obsSrv.editTask(task);
  }

  loadTasks(): void {
    this._tskSrv.getTasks()
      .subscribe((tasks) => {
        this.filteredTasksList = tasks;
        if (this.filteredTasksList !== undefined) {
          this.getParentTasks();
        }
      },
        (error) => {
          console.log('Failed getting tasks' + error);
        });
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
