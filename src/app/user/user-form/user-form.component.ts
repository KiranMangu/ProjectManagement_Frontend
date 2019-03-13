import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  usersData: User[];
  userId: string;
  constructor(private _usrSrv: UserService) { }

  ngOnInit() {
    // this.loadUsers();
  }

  loadUsers(): void {
    this._usrSrv.getUsers()
      .subscribe((users) => {
        this.usersData = users;
        console.log('parent' + users);
      });
  }

  reloadView(payload): void {
    console.log('Reload function');
    this.loadUsers();
  }

  updateUser(payload): void {
    console.log('payload' + payload);
    this.userId = payload;
  }

}
