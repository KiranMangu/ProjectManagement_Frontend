import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userAddGrp: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.userAddGrp = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      employeeId: ['', [Validators.required]]
    });
  }

  resetFields(): void {
    this.userAddGrp.reset();
    this.userAddGrp.updateValueAndValidity();
  }

  addUser(): void {
    // console.log("First Name:" + firstName.value + " Last Name:" + lastName + " Employee Id:" + employeeId);
    // console.log("First Name:" + this.userAddGrp.controls.firstName.value + " Last Name:" + this.userAddGrp.controls.lastName + " Employee Id:" + this.userAddGrp.controls.employeeId);
  }
}
