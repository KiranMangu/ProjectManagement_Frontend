import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { UserSharedService } from '../user-shared.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  // viewUserGrp: FormGroup;
  usersData: User[];
  filteredUsersData: User[];

  fNSrtOrdr: number = -1;
  lNSrtOrdr: number = -1;
  IdSrtOrdr: number = -1;
  searchKey: string = '';
  constructor(private _usrSrv: UserService) { }

  ngOnInit() {
    // console.log('View: ng onit');
    this.loadUsers();
  }

  loadUsers(): void {
    this._usrSrv.getUsers()
      .subscribe((users) => {
        // console.log('View: ' + users);
        this.usersData = users;
        this.filteredUsersData = users;
      });
  }

  sort(sortBy: Number): void {
    if (sortBy === 1) {
      // console.log('First Name')
      this.fNSrtOrdr = this._usrSrv.toggleOrder(this.fNSrtOrdr)
      this.usersData.sort(this._usrSrv.sortData('firstName', this.fNSrtOrdr));
    }
    else if (sortBy === 2) {
      // console.log('Last Name')
      this.lNSrtOrdr = this._usrSrv.toggleOrder(this.lNSrtOrdr)
      this.usersData.sort(this._usrSrv.sortData('lastName', this.lNSrtOrdr));
    }
    else if (sortBy === 3) {
      // console.log('Id')
      this.IdSrtOrdr = this._usrSrv.toggleOrder(this.IdSrtOrdr)
      this.usersData.sort(this._usrSrv.sortData('Id', this.IdSrtOrdr));
    }
    else {
      console.log('Invalid Sort request');
    }
    // console.log(this.usersData);
  }

  // TODO: Small letter data types vs Capital letter data typels Number vs number and String vs string
  // TODO: user.firstName.indexOf(this.searchKey) .... compilation error
  // TODO: this._usrSrv.toggleOrder(this.IdSrtOrdr) .... compilation error
  searchUser(): void {
    // console.log('searchKey: ' + this.searchKey);
    var searchKey = this.searchKey.toLowerCase();
    if (this.searchKey !== '') {
      // TODO: Look for a filter that acts on all the keys on a Json
      var dataByFN = this.filteredUsersData.filter(user => user.firstName.toLowerCase().indexOf(searchKey) !== -1);
      var dataaByLN = this.filteredUsersData.filter(user => user.lastName.toLowerCase().indexOf(searchKey) !== -1);
      var dataById = this.filteredUsersData.filter(user => user.employeeId.toLowerCase().indexOf(searchKey) !== -1);
      this.filteredUsersData = Object.assign(dataByFN, dataaByLN, dataById);
      // this.usersData = this.usersData.filter(user => user.firstName.indexOf(this.searchKey) !== -1);
    }
    else {
      this.filteredUsersData = this.usersData;
    }
    console.log(this.usersData);

  }

}
