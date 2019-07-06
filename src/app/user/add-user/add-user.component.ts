import { Component, OnInit, ViewChild, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, ButtonActions } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';
import { MatSnackBar } from '@angular/material';
import { UtilServiceService } from 'src/app/_util/util-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnChanges {

  @Output() addedNewUser = new EventEmitter<any>();
  @Input() data;
  userAddGrp: FormGroup;
  newUser: User;
  constructor(private _fb: FormBuilder, private _userSrv: UserService,
    private _snkBar: MatSnackBar, private util: UtilServiceService) { }
  @ViewChild('form', { static: true }) form; // TODO ViewChild?
  buttonAction: string = ButtonActions.Submit;
  updateUserId: string;

  ngOnInit() {
    this.userAddGrp = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      employeeId: ['', [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      const userId = changes['data'].currentValue;
      if (userId !== undefined && userId.trim() !== '') {
        this.updateUserId = userId;
        this._userSrv.getUserById(changes['data'].currentValue)
          .subscribe((res) => {
            // console.log(JSON.stringify(res[0]));
            if (res[0] !== undefined) {
              this.userAddGrp.setValue({
                firstName: res[0].firstName,
                lastName: res[0].lastName,
                employeeId: res[0].employeeId
              });
              this.buttonAction = ButtonActions.Update;
            }
          });
      }
      // console.log('getUserById:' + JSON.stringify(userObject[0]));
      // this.userAddGrp.setValue(userObject);
    }
  }

  resetFields(): void {
    // this.form.resetForm(); // MyComments: Work around for resetting the form value
    this.userAddGrp.reset(); // MyComments: Using Reactivformgroup reset is firing validation
    this.buttonAction = ButtonActions.Submit;
    // this.userAddGrp.updateValueAndValidity();
  }

  addUser(userAction): void {
    if (this.userAddGrp.invalid) {
      return;
    } else {
      if (userAction === ButtonActions.Submit) {
        this.newUser = new User(this.userAddGrp.value); // MyComments: Class with partial object constructor
        this._userSrv.addUser(this.newUser)
          .subscribe(() => {
            this.util.showAlert('Successfully created the User', 'OK');
            // this.showAlert('Successfully created the User', 'OK')
            this.refreshData();
            // this._viewCmp.loadUsers();
          },
            (error) => {
              this.util.showAlert('Failed to create the User', 'OK');
            });
      } else if (userAction === ButtonActions.Update) {
        const updateUser = new User({
          _id: this.updateUserId,
          firstName: this.userAddGrp.controls.firstName.value,
          lastName: this.userAddGrp.controls.lastName.value,
          employeeId: this.userAddGrp.controls.employeeId.value
        });
        this._userSrv.updateUserById(updateUser)
          .subscribe(() => {
            this.buttonAction = ButtonActions.Submit;
            this.util.showAlert('Successfully updated the User', 'OK');
            this.refreshData();
          },
            (error) => {
              this.util.showAlert('Failed to update the User', 'OK');
            });
      }
    }
  }

  refreshData(): void {
    this.buttonAction = ButtonActions.Submit;
    this.addedNewUser.emit('Test');
    this.form.resetForm();
  }
}
