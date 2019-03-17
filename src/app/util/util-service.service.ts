import { Injectable } from '@angular/core';
import { DailogData } from '../model/dialog.model';
import { Project } from '../model/project.model';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {

  apiURL: string = environment.baseAPIUrl;
  returnData: DailogData;
  constructor() { }

  mapDailogData(data: DailogData, sourceDate: any, type: String): void {
    data.title = type;
    if (type === 'Projects' && sourceDate !== undefined) {
      sourceDate.forEach(element => {
        console.log('pr: ' + element.project, + ' Id: ' + element._id);
        data.list.push({ name: element.project, Id: element._id });
      });
    }
    else if (type === 'Users' && sourceDate !== undefined) {
      sourceDate.forEach(element => {
        var fullName = element.lastName + ', ' + element.firstName + ' (' + element.employeeId + ')'
        console.log('user: ' + fullName + ' Id: ' + element._id);
        data.list.push({ name: fullName, Id: element._id });
      });
    }
    else if (type === 'ParentTasks' && sourceDate !== undefined) {
      sourceDate.forEach(element => {
        data.list.push({ name: element.parentTask, Id: element._id });
        console.log('parent: ' + element.parentTask + ' Id: ' + element._id);
      })
    }
    // return data;
  }

  getApi(): String {
    return this.apiURL;
  }

}
