import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  projectGroup: FormGroup;
  constructor(private _fb: FormBuilder, private _usrSrv: UserService) { }
  // dateRequired: boolean = false;
  dateDisable: boolean = true;

  ngOnInit() {
    this.projectGroup = this._fb.group({
      projectName: ['', [Validators.required]],
      dateRequired: [false], // Not neede for backend operations
      startDate: [''],
      endDate: [''],
      priority: [0],
      user: ['', { value: '', disabled: true }, [Validators.required]]
    });
  }

  onSetDateChange(): void {
    this.dateDisable = this.projectGroup.controls.dateRequired.value;
    if (this.dateDisable) {
      this.projectGroup.controls.startDate.setValue('');
      this.projectGroup.controls.endDate.setValue('');
    }
    else {
      var today = new Date()
      this.projectGroup.controls.startDate.setValue(today);
      today.setDate(today.getDate() + 1);
      this.projectGroup.controls.endDate.setValue(today);
    }
    // console.log('11' + this.projectGroup.controls.dateRequired.value);
    // this.projectGroup.controls.dateRequired.setValue(!this.projectGroup.controls.dateRequired.value);
    // console.log('22' + this.projectGroup.controls.dateRequired.value);
  }

  getUsers(): void {

  }

  addProject(): void {

  }

  resetControls(): void {
    this.projectGroup.reset();
  }

}
