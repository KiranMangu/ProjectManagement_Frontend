import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project.model';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  constructor(private _prjSrv: ProjectService) { }
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
        this.refreshList = projects;
      });
  }

  // Changes passing to the View Compoment
  refreshProjectDetails(refresh: any): void {
    this.loadProjects();
  }
}
