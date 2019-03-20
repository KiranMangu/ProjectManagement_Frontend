import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { ProjectService } from '../../_services/project.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../_shared/dialog.component';
import { DailogData } from 'src/app/_models/dialog.model';
import { UtilServiceService } from '../../_util/util-service.service';
import { TaskService } from '../../_services/task.service';
import { Task, ParentTask } from '../../_models/task.model';
import { ObserveService } from '../../_util/observe.service';
import { ButtonActions } from '../../_models/user.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit, OnChanges {

  editTask: Task;
  max: Number = 30;
  min: Number = 0;
  thumbLabel: boolean = true;
  taskGroup: FormGroup;
  buttonAction: string = ButtonActions.AddTask;

  constructor(private _fb: FormBuilder, private _usrSrv: UserService,
    private _prjSrv: ProjectService, private _dialog: MatDialog,
    private _utilSrv: UtilServiceService, private _tskSrv: TaskService,
    private _obSrv: ObserveService, private _snakBar: MatSnackBar) { }
  disableControl: boolean = false;
  targetData: DailogData = {
    title: '',
    list: [{
      name: '',
      Id: ''
    }]
  };

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
    this.taskGroup = this._fb.group({
      projectName: ['', [Validators.required]],
      projectId: [''],
      isParentTask: [false],
      task: ['', [Validators.required]],
      parentTask: [''],// MyComments: [{ value: '', disabled: true }], disable at this level is holding the validations instead use readonly on  input
      parentTaskId: [undefined],
      startDate: [undefined, [Validators.required]],
      endDate: [undefined, [Validators.required]],
      user: [undefined],
      userId: [''],
      status: ['Open'],
      priority: ['', [Validators.required]]
    });
    this._obSrv.cast
      .subscribe((task) => {
        if (task !== undefined) {
          console.log('Triggered event');
          console.log('task.projectId:' + task.projectId);
          if (task.projectId !== undefined && task.projectId !== '') {
            this.getOtherFields(task.projectId, task.parentId);
          }
          this.fillFieldsForUpdate(task);
        }
      });
  }

  getOtherFields(prjId: String, prntId: String): any {
    this._prjSrv.getProjectById(prjId)
      .subscribe((prjName) => {
        if (prjName !== undefined) {
          this.taskGroup.controls.projectName.setValue(prjName[0].project);
          if (prntId !== null) {
            this._tskSrv.getParentTaskById(prntId)
              .subscribe((parentTask) => {
                if (parentTask !== undefined) {
                  // console.log('parentId:' + JSON.stringify(parentTask[0].parentTask));
                  this.taskGroup.controls.parentTask.setValue(parentTask[0].parentTask);
                  // return parentTask;
                }
              });
          }
        }
      });
  }

  fillFieldsForUpdate(task: any) {
    this.buttonAction = ButtonActions.UpdateTask;
    this.taskGroup.controls.task.setValue(task.task);
    // this.taskGroup.controls.parentId.setValue(task.parentId);
    this.taskGroup.controls.startDate.setValue(task.startDate);
    this.taskGroup.controls.endDate.setValue(task.endDate);
    this.taskGroup.controls.priority.setValue(task.priority);
    // this.taskGroup.controls.status.setValue(task.status);
  }

  /**
  projectName: ['', [Validators.required]],
      projectId: [''],
      isParentTask: [false],
      task: ['', [Validators.required]],
      parentTask: [''],// MyComments: [{ value: '', disabled: true }], disable at this level is holding the validations instead use readonly on  input
      parentTaskId: [undefined],
      startDate: [{ value: undefined, disabled: true }],
      endDate: [{ value: undefined, disabled: true }],
      user: [{ value: '', disabled: true }],
      userId: [''],
      status: ['Open'],
      priority: ['', [Validators.required]]
   */
  ValidateControls(cntrlGrp: FormGroup) {
    // if ((cntrlGrp.controls.endDate.value !== null) && cntrlGrp.controls.startDate < cntrlGrp.controls.endDate) {
    //   return {
    //     notValid: true
    //   }
    //   return null;
    // }
    console.log('Validation fired');
    // if (cntrlGrp.controls.projectName.value === undefined || cntrlGrp.controls.projectName.value.trim() === '') {
    return { notValid: true };
    // }

  }

  onParentTaskSelected(): void {
    // throw new Error("Method not implemented.");
    // Clear all the fields
    this.taskGroup.controls.projectName.setValue('');
    this.taskGroup.controls.parentTask.setValue('');
    this.taskGroup.controls.priority.setValue(0);
    this.taskGroup.controls.startDate.setValue('');
    this.taskGroup.controls.endDate.setValue('');
    this.taskGroup.controls.user.setValue('');

    // Disable rest of fields
    if (!this.taskGroup.controls.isParentTask.value) {
      this.taskGroup.controls.projectName.disable();
      this.taskGroup.controls.parentTask.disable();
      this.taskGroup.controls.priority.disable();
      this.taskGroup.controls.startDate.disable();
      this.taskGroup.controls.endDate.disable();
      this.taskGroup.controls.user.disable();
    }
    else {
      this.taskGroup.controls.projectName.enable();
      this.taskGroup.controls.parentTask.enable();
      this.taskGroup.controls.priority.enable();
      this.taskGroup.controls.startDate.enable();
      this.taskGroup.controls.endDate.enable();
      this.taskGroup.controls.user.enable();
    }
    this.disableControl = !this.taskGroup.controls.isParentTask.value;
  }

  getProjects(): void {
    // throw new Error("Method not implemented.");
    var dialogRef;
    this._prjSrv.getProjects()
      .subscribe((projects) => {
        this.clearTagetObject();
        this._utilSrv.mapDailogData(this.targetData, projects, 'Projects');
        this.targetData.title = 'Projects';
        dialogRef = this._dialog.open(DialogComponent,
          { data: { title: this.targetData.title, data: this.targetData } });

        dialogRef.afterClosed()
          .subscribe(result => {
            if (result !== undefined) {
              this.taskGroup.controls.projectName.setValue(result.name);
              this.taskGroup.controls.projectId.setValue(result.Id);
            }
          });
      });
  }

  getParentTasks(): void {
    // throw new Error("Method not implemented.");
    var dialogRef;
    this._tskSrv.getAllParentTasks()
      .subscribe((parentTasks) => {
        this.clearTagetObject();
        this._utilSrv.mapDailogData(this.targetData, parentTasks, 'ParentTasks');
        this.targetData.title = 'ParentTasks'

        dialogRef = this._dialog.open(DialogComponent,
          { data: { title: this.targetData.title, data: this.targetData } });

        dialogRef.afterClosed()
          .subscribe(result => {
            if (result !== undefined) {
              this.taskGroup.controls.parentTask.setValue(result.name);
              this.taskGroup.controls.parentTaskId.setValue(result.Id);
            }
          });
      })

  }

  getUsers(): void {
    // throw new Error("Method not implemented.");
    var dialogRef;
    this._usrSrv.getUsers()
      .subscribe((users) => {
        this.clearTagetObject();
        this._utilSrv.mapDailogData(this.targetData, users, 'Users');
        this.targetData.title = 'Users';
        dialogRef = this._dialog.open(DialogComponent,
          { data: { title: this.targetData.title, data: this.targetData } });

        dialogRef.afterClosed()
          .subscribe(result => {
            if (result !== undefined) {
              this.taskGroup.controls.user.setValue(result.name);
              this.taskGroup.controls.userId.setValue(result.Id);
            }
          });
      });
  }

  addTask(): void {
    // throw new Error("Method not implemented.");
    console.log(this.taskGroup.invalid);
    if (this.taskGroup.invalid)
      return;

    console.log(this.taskGroup.controls.isParentTask.value);
    if (this.taskGroup.controls.isParentTask.value) {
      console.log('Parent Task insertion');
      const newParentTask = new ParentTask(this.taskGroup.controls.task.value);
      console.log('task:', JSON.stringify(newParentTask));
      this._tskSrv.addParentTask(newParentTask)
        .subscribe((res) => {
          console.log('Success: Created a new Parent Task')

          this.resetControls();
          // console.log(res.parentTask._id);
          // this.taskGroup.controls.parentId.setValue(res.parentTask._id);
        },
          (error) => {
            console.log('Failed creating parent task' + error);
          })
    }
    else {
      const newTask = new Task(this.taskGroup.getRawValue()); // MyComments: getRawValue to get values even from disabled controls
      console.log('parentTaskId:');
      // console.log('parentId' + this.taskGroup.controls.projectId.value);
      console.log('newTask:' + JSON.stringify(newTask));
      // console.log(new Date(temp.endDate).toISOString());
      this._tskSrv.addTask(newTask)
        .subscribe((res) => {
          console.log('Task Inserted');
          const updateUser = {
            _id: this.taskGroup.controls.userId.value,
            projectId: this.taskGroup.controls.projectId.value,
            taskId: res.taskId
          };
          console.log(JSON.stringify(res));
          // this._usrSrv.updateUserProjectAndTask(updateUser)
          //   .subscribe((res) => {
          //     console.log('Successful: updated user project and task' + res);
          //   },
          //     (error) => {
          //       console.log('Error Updating user project and Task' + error);
          //     });
          this._snakBar.open('Successfully created new Task');
          this.resetControls();

        },
          (error) => {
            this._snakBar.open('Failed: Inserting the task');
            console.log('Failed inserting task: ' + JSON.stringify(error));
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
    this.taskGroup.reset();
  }
}
