import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../model/user.model';
import { Project } from '../../model/project.model';
import { UserService } from '../../service/user.service';
import { ProjectService } from '../../service/project.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../shared/dialog.component';
import { DailogData } from 'src/app/model/dialog.model';
import { UtilServiceService } from '../../util/util-service.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  targetData: DailogData = {
    title: '',
    list: [{
      name: '',
      Id: ''
    }]
  };

  usertList: User[];
  selectedUser: User;
  newProject: Project;
  projectGroup: FormGroup;
  constructor(private _fb: FormBuilder, private _usrSrv: UserService, private _projSrv: ProjectService,
    private _dialog: MatDialog, private dialogSrv: UtilServiceService) { }
  // dateRequired: boolean = false;
  dateDisable: boolean = true;
  thumbLabel = true;

  ngOnInit() {
    this.projectGroup = this._fb.group({
      project: ['', [Validators.required]],
      dateRequired: [false], // Not neede for backend operations
      startDate: [''],
      endDate: [''],
      priority: [0],
      status: ['Open'],
      user: [{ value: '', disabled: true }, [Validators.required]]
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
    this._usrSrv.getUsers()
      .subscribe((users) => {
        this.usertList = users;
        console.log(this.usertList);
        this.dialogSrv.mapDailogData(this.targetData, this.usertList, 'Users'); // TODO Need to include a spinner
      },
        (error) => {
          console.log('Error: add-project.component: ' + error);
        });

    const dialogRef = this._dialog.open(DialogComponent, {
      data: { title: this.targetData.title, data: this.targetData }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.projectGroup.controls.user.setValue(result.name);

      //Native For is better in this case than Foreach 
      for (var i = 0, len = this.usertList.length; i < len; i++) {
        if (this.usertList[i]._id === result.Id) {
          this.selectedUser = this.usertList[i];
          break;
        }
      }

      console.log('selected:' + JSON.stringify(this.selectedUser));
    });
  }

  addProject(): void {
    this.newProject = new Project(this.projectGroup.value);
    console.log(this.newProject);
    this._projSrv.addProject(this.newProject)
      .subscribe((res) => {
        console.log(res);
        this.selectedUser.projectId = res._id;
        console.log(this.selectedUser);
        this._usrSrv.updateUserProject(this.selectedUser)
          .subscribe((res) => {
            console.log('Succssfully created Project and updated ProjectId in User');
          },
            (error) => {
              console.log('Failed: Updating Project Idon user failed' + error);
            });
      },
        (error) => {
          console.log(error);
        });
  }

  resetControls(): void {
    this.projectGroup.reset();
  }

}
