import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from 'app/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  userModel: User;

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;


  constructor(private router:Router, private userService:UserService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.userModel = new User();
  }

  createFormControls() {
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  loginUser() {
    console.log(this.userModel)
    this.userService.login(this.userModel).subscribe(
      (response) => {
        console.log(response);
        if (response){
        this.userService.setUserLoggedIn();
        this.router.navigate(['dashboard']);
      }else{ console.log("No se encontro el usuario");}
      },
      (error) => console.log(error)
      );
    /*
    if(this.userModel.username == 'admin' && this.userModel.password == 'admin') {
      this.user.setUserLoggedIn();
      this.router.navigate(['dashboard']);
    }*/

  }

}