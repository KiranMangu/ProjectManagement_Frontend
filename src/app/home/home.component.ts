import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None // MyComments: For overwriting the style of Material
  // ref: https://stackoverflow.com/questions/45940965/angular-material-customize-tab?rq=1
})
export class HomeComponent implements OnInit {
  //TODO: on tab click the tab name should be displayed on top fo the page
  constructor() { }

  ngOnInit() {
  }

}
