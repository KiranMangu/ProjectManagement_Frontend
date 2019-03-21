import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import * as stubList from '../../_models/stub.model';
import { Project, ProjectList } from '../../_models/project.model';
import { ProjectService } from '../../_services/project.service';
import { UtilServiceService } from '../../_util/util-service.service';
import { TaskService } from 'src/app/_services/task.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  filteredProjecList: ProjectList[];
  copyProjectList: ProjectList[];


  // viewUserGrp: FormGroup;
  @Input() refresh: Project[];
  @Output() updateProject: any = new EventEmitter<any>();

  // filteredUsersData: User[];
  // copyusersData: User[];

  startDateOrder: number = -1;
  endDateOrder: number = -1;
  priorityOrder: number = -1;
  completedOrder: number = -1;

  searchKey: string = '';
  constructor(private _prjSrv: ProjectService, private util: UtilServiceService,
    private _tskSrv: TaskService, private _usrSrv: UserService) { }

  ngOnInit() {
    this.loadProjects();  // MyComments: Initial load
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['refresh']) {
      // MyComments: Subsequent load i.e, load after a new value is entered
      this.filteredProjecList = changes['refresh'].currentValue
      this.copyProjectList = changes['refresh'].currentValue
      // console.log('On Change' + changes['data'].currentValue);
      //this.loadUsers();
    }
  }

  loadProjects(): void {
    this._prjSrv.getProjects()
      .subscribe((projects) => {
        if (projects !== undefined) {
          this.getTasksOnProjectId(projects);
          this.copyProjectList = projects;
          this.filteredProjecList = projects;
        }
        // console.log('View: ' + JSON.stringify(projects));

      });
  }

  getTasksOnProjectId(projects: any) {
    projects.forEach((project) => {
      this._tskSrv.getAllTasksByProjectId(project._id)
        .subscribe((tasks) => {
          if (tasks) {
            let taskObject = JSON.parse(JSON.stringify(tasks));
            let totalTask = taskObject.length;
            project.noOfTasks = totalTask;
            project.completed = 0;
            if (totalTask > 0) {
              var openedTask = 0;
              taskObject.forEach(element => {
                // element.status === undefined -> Initial data was having status as undefined
                if (element.status === undefined || (element.status !== undefined && element.status === 'Open')) {
                  openedTask++;
                }
              });
              project.completed = totalTask - openedTask;
            }
            else {
              project.completed = 0;
            }
            // console.log('Tasks Count:' + JSON.parse(JSON.stringify(tasks)).length)
            if (project.manager !== undefined && project.manager !== null) {
              this.getManagerName(project)
            }
          }
        },
          (error) => {
            console.log('Failed getting Project details:' + error);
            this.util.showAlert('Failed getting Project details', 'OK', true);
          })
    })
  }

  getManagerName(project: ProjectList) {
    this._usrSrv.getUserById(project.manager)
      .subscribe((usr) => {
        if (usr !== undefined) {
          // console.log('View User' + JSON.stringify(usr));
          // console.log('last name' + usr[0].lastName);
          // console.log('first name' + usr[0].firstName);
          const mgrName = usr[0].lastName + ', ' + usr[0].firstName;
          project.managerName = mgrName;
        }
      },
        (error) => {
          console.log('Failed retriving manager information' + error);
          this.util.showAlert('Failed retriving manager information', 'OK', true);
        });
  }

  sort(sortBy: Number): void {
    if (sortBy === 1) {
      // console.log('First Name')
      this.startDateOrder = this._prjSrv.toggleOrder(this.startDateOrder)
      this.filteredProjecList.sort(this._prjSrv.sortByDate('startDate', this.startDateOrder));
    }
    else if (sortBy === 2) {
      // console.log('Last Name')
      this.endDateOrder = this._prjSrv.toggleOrder(this.endDateOrder)
      this.filteredProjecList.sort(this._prjSrv.sortByDate('endDate', this.endDateOrder));
    }
    else if (sortBy === 3) {
      // console.log('Id')
      this.priorityOrder = this._prjSrv.toggleOrder(this.priorityOrder)
      this.filteredProjecList.sort(this._prjSrv.sortData('priority', this.priorityOrder));
    }
    else if (sortBy === 4) {
      // console.log('Id')
      this.completedOrder = this._prjSrv.toggleOrder(this.completedOrder)
      this.filteredProjecList.sort(this._prjSrv.sortData('completed', this.completedOrder));
    }
    else {
      console.log('Invalid Sort request');
    }
    // console.log(this.usersData);
  }

  // TODO: Small letter data types vs Capital letter data types Number vs number and String vs string
  // TODO: user.firstName.indexOf(this.searchKey) .... compilation error
  // TODO: this._prjSrv.toggleOrder(this.IdSrtOrdr) .... compilation error
  searchProject(searchKey: string): void {
    console.log('searchKey: ' + searchKey);
    if (searchKey !== undefined && searchKey.trim() !== '') {
      this.filteredProjecList = this.copyProjectList;
      console.log('list: ' + this.filteredProjecList);
      var dataByFN = this.filteredProjecList.filter(project => project.project.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
      this.filteredProjecList = Object.assign(dataByFN);
    }
    else {
      this.filteredProjecList = this.copyProjectList;
    }
    // console.log('data' + this.data);
  }

  editProject(project: Project): void {
    // console.log('Select project to edit');
    // console.log(project);
    this.updateProject.emit(project);
  }

  suspendProject(id: string): void {
    this.util.showAlert('Implementation details not mentioned', 'OK');
    console.log('Implementation details not mentioned..!!!');
    // this._prjSrv.suspendProject(id)
    //   .subscribe((res) => {
    //     this.loadProjects();
    //     console.log(res);
    //   })
  }

}
