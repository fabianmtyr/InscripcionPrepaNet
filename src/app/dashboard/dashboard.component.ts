import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {MatCardModule} from '@angular/material/card';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	

  constructor(private user: UserService) { }

  ngOnInit() {
  }

}
