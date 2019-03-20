import { Injectable } from '@angular/core';
import { DailogData } from '../_models/dialog.model';
import { Project } from '../_models/project.model'
import { User } from '../_models/user.model';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {

  apiURL: string = environment.baseAPIUrl;
  returnData: DailogData;
  constructor(private _snkBar: MatSnackBar) { }

  mapDailogData(data: DailogData, sourceDate: any, type: String): void {
    data.title = type;
    if (type === 'Projects' && sourceDate !== undefined) {
      sourceDate.forEach(element => {
        console.log('pr: ' + element.project, + ' Id: ' + element._id);
        data.list.push({ name: element.project, Id: element._id });
      });
      data.list.splice(0, 1);
    }
    else if (type === 'Users' && sourceDate !== undefined) {
      sourceDate.forEach(element => {
        var fullName = element.lastName + ', ' + element.firstName + ' (' + element.employeeId + ')'
        console.log('user: ' + fullName + ' Id: ' + element._id);
        data.list.push({ name: fullName, Id: element._id });
      });
      data.list.splice(0, 1);
    }
    else if (type === 'ParentTasks' && sourceDate !== undefined) {
      sourceDate.forEach(element => {
        data.list.push({ name: element.parentTask, Id: element._id });
        console.log('parent: ' + element.parentTask + ' Id: ' + element._id);
      });
      
    }
    // return data;
  }

  getApi(): String {
    return this.apiURL;
  }

  showAlert(message: string, action: string, isError: boolean = false): void {
    if (!isError) {
      this._snkBar.open(message, action, {
        duration: 2000,
        // panelClass: 'snackbar-background'
      });
    }
    else {
      this._snkBar.open(message, action, {
        // panelClass: 'snackbar-background'
      });
    }
  }
}
