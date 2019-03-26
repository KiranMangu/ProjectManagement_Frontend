import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Task } from '../_models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ObserveService {

  private selectedTask = new BehaviorSubject<Task>(undefined);
  private tabNumber = new BehaviorSubject<Number>(undefined);

  cast = this.selectedTask.asObservable();
  changed = this.tabNumber.asObservable();

  editTask(currentTaskId): void {
    this.selectedTask.next(currentTaskId);
  }

  tabChanged(currentTab: Number): void {
    this.tabNumber.next(currentTab);
  }

}
