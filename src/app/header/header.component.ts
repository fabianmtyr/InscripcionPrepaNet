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
    this.updateInfo();
  }

  updateInfo(){
    this.isLoggedIn$ = this.userService.isLoggedIn;
    let info2 = this.userService.tokenInfo();
    console.log(info2);
    this.info = JSON.parse(info2);
    console.log(this.info)
    this.userName = this.info.name;
    console.log(this.userName)
    this.userCampus = this.info.campus;
    this.userEmail = this.info.email;
  }

  logoutUser() {
  	this.userService.setUserLoggedOut();
    this.userName = "";
    this.userCampus = "";
    this.userEmail = ""
  }

}
