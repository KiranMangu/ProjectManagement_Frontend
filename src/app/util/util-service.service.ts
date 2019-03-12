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
    if (type === 'Project') {
      sourceDate.forEach(element => {
        console.log('pr: ' + element.project, + ' Id: ' + element.projectId);
        data.list.push({ name: element.project, Id: element.projectId });
      });
    }
    // return data;
  }

  getApi(): String {
    return this.apiURL;
  }

}
