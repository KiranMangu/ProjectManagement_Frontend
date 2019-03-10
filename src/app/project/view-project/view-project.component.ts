import { Component, OnInit } from '@angular/core';
import * as stubList from '../../model/stub.model';
import { Project, ProjectList } from '../../model/project.model';
@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  projectList: ProjectList[];

  constructor() { }

  ngOnInit() {
    this.projectList = stubList.projectData;
  }

}
