import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DialogComponent } from '../../_shared/dialog.component';
import { MatDialog } from '@angular/material';
import { Project } from 'src/app/_models/project.model';
import { UtilServiceService } from '../../_util/util-service.service';
import { DailogData } from 'src/app/_models/dialog.model';
import { Task, TaskView, ParentTask } from 'src/app/_models/task.model';
import { TaskService } from '../../_services/task.service';
import { ObserveService } from '../../_util/observe.service';
import { ProjectService } from 'src/app/_services/project.service';

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
  searchKey: String;
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
    private _obsSrv: ObserveService, private _prjSrv: ProjectService) { }

  ngOnInit() {
    this.src.mapDailogData(this.targetData, this.data, 'Project');
    // console.log('this.targetDate');
    // console.log(this.targetData);
    // this.getParentTasks();
    this.loadTasks();
    // this._tskSrv.mapParentIdToName(this.filteredTasksList, this.parentList);
    this.copyTasksList = this.filteredTasksList;
    this._obsSrv.changed
      .subscribe((dummyValue) => {
        this.loadTasks();
      });
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
          this.src.showAlert('Failed getting Parent Tasks', 'OK', true);
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
      console.log('Sort by Status');
      console.log('before' + JSON.stringify(this.filteredTasksList));
      this.stSortToggle = this._tskSrv.toggleOrder(this.stSortToggle);
      this.filteredTasksList.sort(this._tskSrv.sortData('status', this.stSortToggle));
      console.log('after' + JSON.stringify(this.filteredTasksList));
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

  endTask(taskId): void {
    this._tskSrv.updateTaskStatusToComplete(taskId)
      .subscribe(() => {
        this.src.showAlert('Updated the Task status as Completed', 'OK');
        this.loadTasks();
      },
        (error) => {
          this.src.showAlert('Failed updating the Task status', 'OK', true);
        });
  }

  searchByProject() {
    if (this.searchKey !== undefined && this.searchKey.trim() === '') {
      this.filteredTasksList = this.copyTasksList;
    }
    else {
      var filterList = this.projectList.filter((project) => {
        return this.searchKey.toLowerCase().indexOf(project.project.toLowerCase()) > -1;
      });

      // if (filterList !== undefined && filterList.length > 0) {
      //   var fillteredTskLst = this.filteredTasksList.filter((task) => {
      //     return filterList.indexOf(task.projectId) > -1;
      //   });
    }
  }

  getAllProjects(): void {
    this._prjSrv.getProjects()
      .subscribe((projects) => {
        this.projectList = projects;
      }, (error) => {
        console.log('Failed getting projects' + error);
        this.src.showAlert('Failed getting projects', 'OK', true);
      });
    // this._prjSrv.getProjectById
  }

  loadTasks(): void {
    this.getAllProjects();
    this._tskSrv.getTasks()
      .subscribe((tasks) => {
        this.filteredTasksList = tasks;
        if (this.filteredTasksList !== undefined) {
          this.getParentTasks();
        }
      },
        (error) => {
          console.log('Failed getting tasks' + error);
          this.src.showAlert('Failed getting tasks', 'OK', true);
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
