import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	isLoggedIn$: Observable<boolean>;
  info = {'name': '', 'email': '', 'campus':''}
	userEmail: string;
  userName: string;
  userCampus: string;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.userService.isLoggedIn;

  }

  logoutUser() {
  	this.userService.setUserLoggedOut();
  }

}
