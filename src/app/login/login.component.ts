import { Component, OnInit, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from 'app/models/user.model';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  userModel: User;
  loginForm: FormGroup;
  eml = true;
  pass = true;
  nom = ""
  cam = ""

  constructor(private router:Router, private userService:UserService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });

  }

  loginUser() {
    //console.log(this.userModel)
    this.userModel = this.loginForm.value;
    console.log(this.userModel);

    this.userService.login(this.userModel).subscribe(
      (response: any) => {
        this.eml = response.email;
        this.pass = response.password;
        this.nom = response.name;
        this.cam = response.campus;

        console.log(response);
        if(response.email && response.password){
          //this.userService.setUserLoggedIn(this.userModel);
          this.userService.setUserLoggedIn(this.userModel.email, this.cam, this.nom)
        }
        else {
          console.log("Algo malo ocurrio!")
        }
      },
      (error) => console.log(error)
      );
  }

}