import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilServiceService } from '../util/util-service.service';
import { Project } from '../model/project.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiUrl: string;

  constructor(private _http: HttpClient, private _util: UtilServiceService) {
    this.apiUrl = this._util.apiURL + 'projects/';
  }

  ngOnInit(): void {
    // this.apiUrl = this._util.apiURL; //TODO: Need to check this step as this is not being called before getUsers..!!!
  }

  getProjects(): any {
    return this._http.get(this.apiUrl);
  }

  getProjectById(id): any {
    return this._http.get(this.apiUrl + id);
  }

  addProject(newProject: Project): any {
    return this._http.post(this.apiUrl + 'create', newProject);
  }

  updateProjectById(updateUser: any): any {
    return this._http.put(this.apiUrl + 'update', updateUser);
  }

  suspendProject(id: string): any {
    return this._http.delete(this.apiUrl + 'delete/' + id, { responseType: 'text' }); // MyComments: Return text
  }


  getSelectedUser(usertList: User[], selectedUserId: string): any {
    var selectedUser;
    for (var i = 0, len = usertList.length; i < len; i++) {
      if (usertList[i]._id === selectedUserId) {
        selectedUser = usertList[i];
        break;
      }
    }
    return selectedUser;
  }

  sortData(sortOn, sortOrder): any {
    return (a, b) => {
      if (a[sortOn] > b[sortOn]) {
        return (1 * sortOrder);
      } else if (a[sortOn] < b[sortOn]) {
        return (-1 * sortOrder);
      }
      return 0;
    }
  }

  sortByDate(sortOn, sorOrder): any {
    console.log('sortByDate');
    return (a, b) => {
      if (sortOn === 'startDate') {
        var returnVal = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        return returnVal * sorOrder;
      }
      else if (sortOn === 'endDate') {
        {
          var returnVal = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
          return returnVal * sorOrder;
        }
      }
    }
  }

  toggleOrder(sortOrder: number): number {
    return (sortOrder * -1)
  }
}
