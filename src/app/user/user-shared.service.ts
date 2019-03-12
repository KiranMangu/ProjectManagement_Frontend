import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserSharedService {
  private userList: User[];

  constructor(private _usrSrv: UserService) { }

  setUserList(): any {
    console.log('Shared service');
    this._usrSrv.getUsers()
      .subscribe((users) => {
        this.userList = users;
        console.log('------');
        console.log(this.userList);
      });
  }

  getuserList(): any {
    return this.userList;
  }
}
