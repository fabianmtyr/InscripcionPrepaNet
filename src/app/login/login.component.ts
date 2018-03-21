import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModel = new User;

  constructor(private router:Router, private user:UserService) { }

  ngOnInit() {
  }

  loginUser() {
  	if(this.userModel.email == 'admin' && this.userModel.password == 'admin') {
  		this.user.setUserLoggedIn();
  		this.router.navigate(['dashboard']);
  	}
  }

}
