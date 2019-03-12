import { Component, OnInit } from '@angular/core';
import { UserSharedService } from '../user-shared.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  providers: [UserSharedService]
})
export class UserFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
