import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user.model';

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

  // Trigger the On-change by sending the Input ting the value to View Component
  loadUsers(): void {
    this._usrSrv.getUsers()
      .subscribe((users) => {
        this.usersData = users;
        console.log('parent' + users);
      });
  }

  // After update change the View Component
  reloadView(payload): void {
    console.log('Reload function');
    this.loadUsers();
  }

  // Send data to Add Component
  updateUser(payload): void {
    console.log('payload' + payload);
    this.userId = payload;
  }

}
