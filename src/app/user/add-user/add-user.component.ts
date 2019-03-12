import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { UserSharedService } from '../user-shared.service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userAddGrp: FormGroup;
  newUser: User;
  constructor(private _fb: FormBuilder, private _userSrv: UserService, private _sharedSrv: UserSharedService) { };
  @ViewChild('form') form; // TODO ViewChild?

  ngOnInit() {
    this.userAddGrp = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      employeeId: ['', [Validators.required]]
    });
    console.log('Add User');
    this._sharedSrv.setUserList();
  }

  resetFields(): void {
    this.form.resetForm(); // MyComments: Work around for resetting the form value
    // this.userAddGrp.reset(); // MyComments: Using Reactivformgroup reset is firing validation
    // this.userAddGrp.updateValueAndValidity();
  }

  addUser(): void {
    this.newUser = new User(this.userAddGrp.value); // MyComments: Class with partial object constructor
    this._userSrv.addUser(this.newUser).subscribe(() => {
      console.log('Inserted');
      this._sharedSrv.setUserList();
      this.form.resetForm();
      // this._viewCmp.loadUsers();
    });
  }
}
