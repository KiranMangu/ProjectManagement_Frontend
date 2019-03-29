import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DailogData } from '../../_models/dialog.model';
import { User, ButtonActions } from '../../_models/user.model';
import { Project } from '../../_models/project.model';
import { UserService } from '../../_services/user.service';
import { ProjectService } from '../../_services/project.service';
import { DialogComponent } from '../../_shared/dialog.component';
import { UtilServiceService } from '../../_util/util-service.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit, OnChanges {

  min: Number = 0;
  max: Number = 30;
  usertList: User[];
  selectedUser: User;
  editUser: User;
  editProjectId: string;
  newProject: Project;
  projectGroup: FormGroup;
  dateDisable: Boolean = true;
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
  @Output() refreshProjectDetails = new EventEmitter<any>();

  constructor(private _fb: FormBuilder, private _usrSrv: UserService, private _projSrv: ProjectService,
    private _dialog: MatDialog, private util: UtilServiceService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      const currentProject = changes['data'].currentValue;
      // console.log('onChange' + JSON.stringify(currentProject));
      if (currentProject !== undefined && currentProject !== '') {
        this.resetControls();
        this.projectGroup.controls.project.setValue(currentProject.project);
        this.projectGroup.controls.startDate.setValue(currentProject.startDate);
        this.projectGroup.controls.endDate.setValue(currentProject.endDate);
        this.projectGroup.controls.priority.setValue(currentProject.priority);
        this.projectGroup.controls.managerId.setValue(currentProject.manager);
        this.projectGroup.controls.manager.setValue(currentProject.managerName);

        this.editProjectId = currentProject._id;
        this.buttonAction = ButtonActions.Update;
      }
    }
  }

  ngOnInit() {
    this.projectGroup = this._fb.group({
      project: ['', [Validators.required]],
      dateRequired: [false], // Not needed for backend operations
      startDate: [''],
      endDate: [''],
      priority: [0],
      // status: ['Open'],
      manager: ['', [Validators.required]],
      managerId: ['']
    }, { validator: this.checkDates });
  }

  checkDates(group: FormGroup): any {
    if ((group.controls.endDate.value !== null) && group.controls.startDate.value > group.controls.endDate.value) {
      // console.log("invalid  :" + group.controls.endDate.value + ":");
      return { notValid: true };
    }
    // console.log("valid");
    return null;
  }

  onSetDateChange(): void {
    this.setDateFields();
  }
  setDateFields(): void {
    this.dateDisable = this.projectGroup.controls.dateRequired.value;
    // console.log('dateDisable' + this.dateDisable);
    if (this.dateDisable) {
      this.projectGroup.controls.startDate.setValue('');
      this.projectGroup.controls.endDate.setValue('');
    } else {
      const today = new Date();
      this.projectGroup.controls.startDate.setValue(today);
      today.setDate(today.getDate() + 1);
      this.projectGroup.controls.endDate.setValue(today);
    }
  }

  getUsers(): void {
    let dialogRef;
    this._usrSrv.getUsers()
      .subscribe((users) => {
        this.usertList = users;
        // console.log(this.usertList);
        this.clearTagetObject();
        this.util.mapDailogData(this.targetData, this.usertList, 'Users'); // TODO Need to include a spinner

        dialogRef = this._dialog.open(DialogComponent, {
          data: { title: this.targetData.title, data: this.targetData }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined) {
            // console.log('dialog closed' + result);
            this.projectGroup.controls.manager.setValue(result.name);
            // console.log('manager: ' + this.projectGroup.controls.manager.value);
            this.projectGroup.controls.managerId.setValue(result.Id);
            // Native For is better in this case than Foreach
            this.selectedUser = this._projSrv.getSelectedUser(this.usertList, result.Id);
            // console.log('selected:' + JSON.stringify(this.selectedUser));
          }
        });
      },
        (error) => {
          console.log('Error: add-project.component: ' + error);
          this.util.showAlert('Failed getting users', 'OK', true);
        });
  }

  addProject(): void {
    if (this.projectGroup.valid) {
      if (this.buttonAction === ButtonActions.Add) {
        this.newProject = new Project(this.projectGroup.getRawValue());
        this.newProject.manager = this.projectGroup.controls.managerId.value;
        // console.log(this.newProject);
        this._projSrv.addProject(this.newProject)
          .subscribe((res) => {
            // console.log(res);
            this.selectedUser.projectId = res._id;
            // console.log(this.selectedUser);
            this.util.showAlert('Successfully created Project', 'OK');
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
              this.util.showAlert('Failed Project creation', 'OK');
              console.log(error);
            });
      } else if (this.buttonAction === ButtonActions.Update) {
        // console.log('grp' + JSON.stringify(this.projectGroup.value));
        // console.log('edit project:' + this.projectGroup.controls.manager.value);
        const updateProject = new Project(this.projectGroup.getRawValue());
        updateProject._id = this.editProjectId;
        updateProject.manager = this.projectGroup.controls.managerId.value;

        // console.log('updateProject:' + JSON.stringify(updateProject));

        this._projSrv.updateProjectById(updateProject)
          .subscribe((res) => {
            // console.log('Updated project' + res);
            // this.refreshProjectDetails.emit(res);
            this.resetControls();
            this.util.showAlert('Successfully updated Project', 'OK');
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
              this.util.showAlert('Failed Project updation', 'OK');
            });
      }
    } else {
      return;
      // this.util.showAlert('Invalid/Missing Project entries', 'OK', true);
    }
  }

  clearTagetObject() {
    this.targetData.title = '';
    this.targetData.list = [{
      name: '',
      Id: ''
    }];
  }

  resetControls(): void {
    this.buttonAction = ButtonActions.Add;
    this.projectGroup.controls.project.setValue(''); // TODO : Validation is firing should remove
    this.projectGroup.controls.dateRequired.setValue(true);
    this.setDateFields();
    this.projectGroup.reset();
    this.refreshProjectDetails.emit('refresh'); // TODO: Not needed all the time
  }
}
