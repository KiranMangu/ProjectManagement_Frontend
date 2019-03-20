import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Task } from '../_models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ObserveService {

  private selectedTask = new BehaviorSubject<Task>(undefined);
  cast = this.selectedTask.asObservable();

  editTask(currentTaskId): void {
    this.selectedTask.next(currentTaskId);
  }

}
