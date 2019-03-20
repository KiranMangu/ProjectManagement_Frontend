import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ObserveService } from '../_util/observe.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None // MyComments: For overwriting the style of Material
  // ref: https://stackoverflow.com/questions/45940965/angular-material-customize-tab?rq=1
})
export class HomeComponent implements OnInit {
  //TODO: on tab click the tab name should be displayed on top fo the page
  tabTitle: string;
  tabNames: string[] = ['Add Project', 'Add Task', 'User', 'View Task'];
  selectedTab: number;

  constructor(private _obSrv: ObserveService) {
  }
  ngOnInit() {
    this.tabTitle = this.tabNames[0];
    this._obSrv.cast
      .subscribe((task) => {
        if (task !== undefined) {
          this.selectedTab = 1;
        }
      });
  }

  tabChanged(tabeSelected: number): void {
    if (this.tabNames !== undefined)
      this.tabTitle = this.tabNames[tabeSelected];
    this.selectedTab = tabeSelected;
  }
}
