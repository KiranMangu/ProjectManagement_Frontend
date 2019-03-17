import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, ButtonActions } from '../../model/user.model';
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
export class AddProjectComponent implements OnInit, OnChanges {

  usertList: User[];
  selectedUser: User;
  editUser: User;
  editProjectId: string;
  newProject: Project;
  projectGroup: FormGroup;
  dateDisable: boolean = true;
  thumbLabel = true;
  buttonAction: string = ButtonActions.Add;
  targetData: DailogData = {
    title: 'Users',
    list: [{
      name: '',
      Id: ''
    }]
  };

  @Input() data;
  @Output() refreshProjectDetails = new EventEmitter<any>()

  constructor(private _fb: FormBuilder, private _usrSrv: UserService, private _projSrv: ProjectService,
    private _dialog: MatDialog, private dialogSrv: UtilServiceService) { }
  // dateRequired: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      var currentProject = changes['data'].currentValue;
      console.log('onChange' + JSON.stringify(currentProject));
      if (currentProject !== undefined && currentProject !== '') {
        this.resetControls();
        this.projectGroup.controls.project.setValue(currentProject.project);
        this.projectGroup.controls.startDate.setValue(currentProject.startDate);
        this.projectGroup.controls.endDate.setValue(currentProject.endDate);
        this.projectGroup.controls.priority.setValue(currentProject.priority);
        if (currentProject.manager !== undefined)
          this.projectGroup.controls.manager.setValue(currentProject.manager);
        this.editProjectId = currentProject._id;
        this.buttonAction = ButtonActions.Update;
      }
    }
  }

  // getUserByProjectId(id: string): User {
  //   var editUser;
  //   this._usrSrv.getUserByProjectId(id)
  //     .subscribe((user) => {
  //       this.editUser = user;
  //       editUser = user.lastName + ', ' + user.firstName + ' (' + user.employeeId + ')'
  //     })
  //   console.log(editUser);
  //   return editUser;
  // }

  ngOnInit() {
    this.projectGroup = this._fb.group({
      project: ['', [Validators.required]],
      dateRequired: [false], // Not needed for backend operations
      startDate: [{ value: '', disabled: true }],
      endDate: [{ value: '', disabled: true }],
      priority: [0],
      // status: ['Open'],
      manager: [{ value: '', disabled: true }, [Validators.required]],
      managerId: ['']
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
        this.clearTagetObject();
        this.dialogSrv.mapDailogData(this.targetData, this.usertList, 'Users'); // TODO Need to include a spinner
      },
        (error) => {
          console.log('Error: add-project.component: ' + error);
        });

    const dialogRef = this._dialog.open(DialogComponent, {
      data: { title: this.targetData.title, data: this.targetData }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log('dialog closed' + result);
        this.projectGroup.controls.manager.setValue(result.name);
        console.log('manager: ' + this.projectGroup.controls.manager.value);
        this.projectGroup.controls.managerId.setValue(result.Id);
        //Native For is better in this case than Foreach 
        this.selectedUser = this._projSrv.getSelectedUser(this.usertList, result.Id);

        console.log('selected:' + JSON.stringify(this.selectedUser));
      }
    });
  }

  addProject(): void {
    if (this.buttonAction === ButtonActions.Add) {
      this.newProject = new Project(this.projectGroup.value);
      console.log(this.newProject);
      this._projSrv.addProject(this.newProject)
        .subscribe((res) => {
          console.log(res);
          this.selectedUser.projectId = res._id;
          console.log(this.selectedUser);
          this.resetControls();
          // this._usrSrv.updateUserProject(this.selectedUser)
          //   .subscribe((res) => {
          //     console.log('Succssfully created Project and updated ProjectId in User');
          //   },
          //     (error) => {
          //       console.log('Failed: Updating Project Id on user failed' + error);
          //     });
        },
          (error) => {
            console.log(error);
          });
    }
    else if (this.buttonAction === ButtonActions.Update) {
      console.log('grp' + JSON.stringify(this.projectGroup.value));
      console.log('edit project:' + this.projectGroup.controls.manager.value);
      var updateProject = new Project(this.projectGroup.value);
      updateProject._id = this.editProjectId;
      updateProject.manager = this.projectGroup.controls.managerId.value;

      console.log('updateProject:' + JSON.stringify(updateProject));
      this._projSrv.updateProjectById(updateProject)
        .subscribe((res) => {
          console.log('Updated project' + res);
          this.refreshProjectDetails.emit(res);
          this.resetControls();
          // this.editUser.projectId = res._id;
          // console.log('User to Edit: ' + this.editUser);
          // this._usrSrv.updateUserProject(this.editUser)
          //   .subscribe((res) => {
          //     this.resetControls();
          //     this.buttonAction = ButtonActions.Add;
          //     console.log('Succssfully updated Project and updated ProjectId in User');
          //   },
          //     (error) => {
          //       console.log('Failed: Updating Project Id on user failed' + error);
          //     });
        },
          (error) => {
            console.log(error);
          });
    }
  }

  clearTagetObject() {
    this.targetData.title = '';
    this.targetData.list = [{
      name: '',
      Id: ''
    }]
  }

  resetControls(): void {
    this.projectGroup.reset();
  }
}
