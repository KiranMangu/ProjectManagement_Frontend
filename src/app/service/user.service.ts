import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilServiceService } from '../util/util-service.service';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  apiUrl: string;

  constructor(private _http: HttpClient, private _util: UtilServiceService) {
    this.apiUrl = this._util.apiURL + 'users/';
  }

  ngOnInit(): void {
    // this.apiUrl = this._util.apiURL; //TODO: Need to check this step as this is not being called before getUsers..!!!
  }

  getUsers(): any {
    return this._http.get(this.apiUrl);
  }

  sortData(sortOn, sortOrder): any {
    return (a, b) => {
      if (a[sortOn] > b[sortOn]) {
        return (1 * sortOrder);
      } else if (a[sortOn] < b[sortOn]) {
        return (-1 * sortOrder);
      }
      return 0;
    }
  }

  toggleOrder(sortOrder: number): number {
    return (sortOrder * -1)
  }

  addUser(newUser: User): any {
    return this._http.post(this.apiUrl + 'create', newUser);
  }
}
