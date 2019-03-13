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

  getUserById(id): any {
    return this._http.get(this.apiUrl + id);
  }

  addUser(newUser: User): any {
    return this._http.post(this.apiUrl + 'create', newUser);
  }

  updateUserById(updateUser: any): any {
    return this._http.put(this.apiUrl + 'update', updateUser);
  }

  deleteUser(id: string): any {
    return this._http.delete(this.apiUrl + 'delete/' + id, { responseType: 'text' }); // MyComments: Return text
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
}
