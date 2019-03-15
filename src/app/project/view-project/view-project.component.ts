import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import * as stubList from '../../model/stub.model';
import { Project, ProjectList } from '../../model/project.model';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  filteredProjecList: ProjectList[];
  copyProjectList: ProjectList[];


  // viewUserGrp: FormGroup;
  @Input() data: Project[];
  @Output() updateUser: any = new EventEmitter<any>();

  // filteredUsersData: User[];
  // copyusersData: User[];

  startDateOrder: number = -1;
  endDateOrder: number = -1;
  priorityOrder: number = -1;
  completedOrder: number = -1;

  searchKey: string = '';
  constructor(private _prjSrv: ProjectService) { }

  ngOnInit() {
    this.loadProjects();  // MyComments: Initial load
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      // MyComments: Subsequent load i.e, load after a new value is entered
      this.filteredProjecList = changes['data'].currentValue
      this.copyProjectList = changes['data'].currentValue
      // console.log('On Change' + changes['data'].currentValue);
      //this.loadUsers();
    }
  }

  loadProjects(): void {
    this._prjSrv.getProjects()
      .subscribe((projects) => {
        console.log('View: ' + JSON.stringify(projects));
        this.copyProjectList = projects;
        this.filteredProjecList = projects;
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
      this.filteredProjecList.sort(this._prjSrv.sortByDate('lastName', this.endDateOrder));
    }
    else if (sortBy === 3) {
      // console.log('Id')
      this.priorityOrder = this._prjSrv.toggleOrder(this.priorityOrder)
      this.filteredProjecList.sort(this._prjSrv.sortData('Id', this.priorityOrder));
    }
    else if (sortBy === 3) {
      // console.log('Id')
      this.completedOrder = this._prjSrv.toggleOrder(this.completedOrder)
      this.filteredProjecList.sort(this._prjSrv.sortData('Id', this.completedOrder));
    }
    else {
      console.log('Invalid Sort request');
    }
    // console.log(this.usersData);
  }

  // TODO: Small letter data types vs Capital letter data typels Number vs number and String vs string
  // TODO: user.firstName.indexOf(this.searchKey) .... compilation error
  // TODO: this._prjSrv.toggleOrder(this.IdSrtOrdr) .... compilation error
  searchUser(): void {
    // console.log('searchKey: ' + this.searchKey);
    var searchKey = this.searchKey.toLowerCase();
    if (this.searchKey.trim() !== '') {
      // TODO: Look for a filter that acts on all the keys on a Json
      var dataByFN = this.filteredProjecList.filter(project => project.project.toLowerCase().indexOf(searchKey) !== -1);
      // var dataById = this.filteredProjecList.filter(project => project.startDate === searchKey));
      // var dataById = this.filteredProjecList.filter(project => project.endDate === searchKey));
      // this.filteredProjecList = Object.assign(dataByFN, dataaByLN, dataById);
      this.filteredProjecList = Object.assign(dataByFN);
      // this.usersData = this.usersData.filter(user => user.firstName.indexOf(this.searchKey) !== -1);
    }
    else {
      this.filteredProjecList = this.copyProjectList;
    }
    // console.log('data' + this.data);
  }

  editUser(id: string): void {
    // console.log(id);
    this.updateUser.emit(id); // MyComments: Should have sent the User Object directly.!!!
  }

  suspendProject(id: string): void {
    this._prjSrv.suspendProject(id)
      .subscribe((res) => {
        this.loadProjects();
        console.log(res);
      })
  }

}
