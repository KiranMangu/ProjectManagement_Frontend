import { Component, OnInit } from '@angular/core';
import { Project } from '../../_models/project.model';
import { ProjectService } from '../../_services/project.service';
import { TaskService } from '../../_services/task.service';
import { UserService } from '../../_services/user.service';
import { UtilServiceService } from '../../_util/util-service.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  constructor(private _prjSrv: ProjectService, private util: UtilServiceService,
    private _tskSrv: TaskService, private _usrSrv: UserService) { }
  updateProject: Project;
  refreshList: any;

  ngOnInit() {
  }

  // Passing the project details to Add Component
  UpdateProject(project: Project): void {
    console.log('Payload' + project)
    this.updateProject = project;
  }

  loadProjects(): void {
    this._prjSrv.getProjects()
      .subscribe((projects) => {
        if (projects !== undefined) {
          this.getTasksOnProjectId(projects);
          this.refreshList = projects;
        }
      });
  }

  getTasksOnProjectId(projects: any) {
    projects.forEach((project) => {
      this._tskSrv.getAllTasksByProjectId(project._id)
        .subscribe((tasks) => {
          if (tasks) {
            let taskObject = JSON.parse(JSON.stringify(tasks));
            let totalTask = taskObject.length;
            project.noOfTasks = totalTask;
            project.completed = 0;
            if (totalTask > 0) {
              var openedTask = 0;
              taskObject.forEach(element => {
                // element.status === undefined -> Initial data was having status as undefined
                if (element.status === undefined || (element.status !== undefined && element.status === 'Open')) {
                  openedTask++;
                }
              });
              project.completed = totalTask - openedTask;
            }
            else {
              project.completed = 0;
            }
            // console.log('Tasks Count:' + JSON.parse(JSON.stringify(tasks)).length)
            if (project.manager !== undefined && project.manager !== null) {
              this.getManagerName(project)
            }
          }
        })
    })
  }

  getManagerName(project: any) {
    this._usrSrv.getUserById(project.manager)
      .subscribe((usr) => {
        if (usr !== undefined) {
          // console.log('View User' + JSON.stringify(usr));
          // console.log('last name' + usr[0].lastName);
          // console.log('first name' + usr[0].firstName);
          const mgrName = usr[0].lastName + ', ' + usr[0].firstName;
          project.managerName = mgrName;
        }
      },
        (error) => {
          console.log('Failed retriving manager information' + error);
          this.util.showAlert('Failed retriving manager information', 'OK', true);
        });
  }
  // Changes passing to the View Compoment
  refreshProjectDetails(refresh: any): void {
    this.loadProjects();
  }
}
