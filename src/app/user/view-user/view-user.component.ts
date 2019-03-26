import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { User } from '../../_models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { UtilServiceService } from '../../_util/util-service.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit, OnChanges {

  // viewUserGrp: FormGroup;
  @Input() data: User[];
  @Output() updateUser: any = new EventEmitter<any>();

  filteredUsersData: User[];
  copyusersData: User[];

  fNSrtOrdr: number = -1;
  lNSrtOrdr: number = -1;
  IdSrtOrdr: number = -1;
  searchKey: String = '';
  constructor(private _usrSrv: UserService, private util: UtilServiceService) { }

  ngOnInit() {
    this.loadUsers();  // MyComments: Initial load
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      // MyComments: Subsequent load i.e, load after a new value is entered
      this.filteredUsersData = changes['data'].currentValue;
      this.copyusersData = changes['data'].currentValue;
      // console.log('On Change' + changes['data'].currentValue);
      // this.loadUsers();
    }
  }

  loadUsers(): void {
    this._usrSrv.getUsers()
      .subscribe((users) => {
        // console.log('View: ' + JSON.stringify(users));
        this.copyusersData = users;
        this.filteredUsersData = users;
      });
  }

  sort(sortBy: Number): void {
    if (sortBy === 1) {
      this.fNSrtOrdr = this._usrSrv.toggleOrder(this.fNSrtOrdr);
      this.filteredUsersData.sort(this._usrSrv.sortData('firstName', this.fNSrtOrdr));
    } else if (sortBy === 2) {
      this.lNSrtOrdr = this._usrSrv.toggleOrder(this.lNSrtOrdr);
      this.filteredUsersData.sort(this._usrSrv.sortData('lastName', this.lNSrtOrdr));
    } else if (sortBy === 3) {
      this.IdSrtOrdr = this._usrSrv.toggleOrder(this.IdSrtOrdr);
      this.filteredUsersData.sort(this._usrSrv.sortData('employeeId', this.IdSrtOrdr));
    } else {
      console.log('Invalid Sort request');
    }
    // console.log(this.usersData);
  }

  // TODO: Small letter data types vs Capital letter data typels Number vs number and String vs string
  // TODO: user.firstName.indexOf(this.searchKey) .... compilation error
  // TODO: this._usrSrv.toggleOrder(this.IdSrtOrdr) .... compilation error
  searchUser(): void {
    // console.log('searchKey: ' + this.searchKey);
    const searchKey = this.searchKey.toLowerCase();
    if (this.searchKey.trim() !== '') {
      this.filteredUsersData = this.copyusersData;
      // TODO: Look for a filter that acts on all the keys on a Json
      const dataByFN = this.filteredUsersData.filter(user => user.firstName.toLowerCase().indexOf(searchKey) !== -1);
      const dataaByLN = this.filteredUsersData.filter(user => user.lastName.toLowerCase().indexOf(searchKey) !== -1);
      const dataById = this.filteredUsersData.filter(user => user.employeeId.toLowerCase().indexOf(searchKey) !== -1);
      this.filteredUsersData = Object.assign(dataByFN, dataaByLN, dataById);
      // this.usersData = this.usersData.filter(user => user.firstName.indexOf(this.searchKey) !== -1);
    } else {
      this.filteredUsersData = this.copyusersData;
    }
    // console.log('data' + this.data);
  }

  editUser(id: string): void {
    // console.log('edit test' + id);
    this.updateUser.emit(id); // MyComments: Should have sent the User Object directly.!!!
  }

  deleteUser(id: string): void {
    this._usrSrv.deleteUser(id)
      .subscribe((res) => {
        this.loadUsers();
        this.util.showAlert('Successfully deleted the User', 'OK');
      },
        (error) => {
          console.log('Failed user deletion:' + JSON.stringify(error));
          this.util.showAlert('Failed User deletion', 'OK');
        });
  }

}
