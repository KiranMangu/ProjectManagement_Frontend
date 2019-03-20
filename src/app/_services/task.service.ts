import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Task, ParentTask } from '../_models/task.model';
import { UtilServiceService } from '../_util/util-service.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl: string;
  parentTaskUrl: string;

  constructor(private _http: HttpClient, private _util: UtilServiceService) {
    this.apiUrl = this._util.apiURL + 'tasks/';
    this.parentTaskUrl = this._util.apiURL + 'parenttask/';
  }

  getTasks(): any {
    return this._http.get(this.apiUrl);
  }

  getTaskById(id): any {
    return this._http.get(this.apiUrl + id);
  }

  addTask(newTask: Task): any {
    return this._http.post(this.apiUrl + 'create', newTask);
  }

  updateTaskById(updateTask: any): any {
    return this._http.put(this.apiUrl + 'update', updateTask);
  }

  updateUserProject(updateUser: any): any {
    return this._http.post(this.apiUrl + 'update/userproject', updateUser);
  }

  updateUserTask(updateUser: any): any {
    return this._http.post(this.apiUrl + 'update/usertask', updateUser);
  }

  deleteTask(id: string): any {
    return this._http.delete(this.apiUrl + 'delete/' + id, { responseType: 'text' }); // MyComments: Return text
  }

  addParentTask(newParentTask: ParentTask): any {
    return this._http.post(this.parentTaskUrl + 'create', newParentTask);
  }

  getAllParentTasks() {
    return this._http.get(this.parentTaskUrl);
  }

  getAllTasksByProjectId(projectId: String) {
    return this._http.get(this.apiUrl + 'tasksByProjectId/' + projectId);
  }
  // getUserByProjectId(id): any {
  //   return this._http.get(this.apiUrl + 'project/' + id);
  // }

  getParentTaskById(Id: String) {
    return this._http.get(this.parentTaskUrl + Id);
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
    // console.log('sortByDate');
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

  mapParentIdToName(taskViewList: any, parentTasks: any): void {
    // console.log('taskViewList' + JSON.stringify(taskViewList));
    // console.log('parentTasks' + JSON.stringify(parentTasks));
    taskViewList.forEach(element => {
      // console.log('task: ' + element.task);
      // console.log('parentId: ' + element.parentId);
      parentTasks.forEach(parentelement => {
        if (parentelement._id === element.parentId) {
          element.parentTask = parentelement.parentTask;
        }
      });
    });
  }
}
