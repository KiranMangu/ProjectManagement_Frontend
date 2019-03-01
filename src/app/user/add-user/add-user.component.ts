import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';

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
      firstName: 'One',
      lastName: 'Two',
      employeeId: 'Three'
    });
  }

  resetFields() {
    this.userAddGrp.reset();
  }

}
