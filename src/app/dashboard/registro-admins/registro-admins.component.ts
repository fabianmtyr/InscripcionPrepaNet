import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-registro-admins',
  templateUrl: './registro-admins.component.html',
  styleUrls: ['./registro-admins.component.css']
})
export class RegistroAdminsComponent implements OnInit {

	registerAdminForm: FormGroup;
	fname: FormControl;
	lname: FormControl;
	email: FormControl;
	password: FormControl;
	passwordVerify: FormControl;

	user: User;

  constructor(private userService: UserService, ) { }

  ngOnInit() {
  	this.createFormControls();
  	this.createForm();
  	this.user = new User();
  }

  createFormControls() {
  	this.fname = new FormControl('', Validators.required);
  	this.lname = new FormControl('', Validators.required);
  	this.email = new FormControl('', Validators.required);
  	this.password = new FormControl('', Validators.required);
  	this.passwordVerify = new FormControl('', Validators.required);
  }

  createForm() {
  	this.registerAdminForm = new FormGroup({
  		fname: this.fname,
  		lname: this.lname,
  		email: this.email,
  		password: this.password,
  		passwordVerify: this.passwordVerify,
  	});
  }

  addUser() {
    this.userService.registerUser(this.user).subscribe(
      (response) => {
        console.log(response);
        if (response)
        {
          console.log("Se agrego usuario");
        }
        else
        {
          console.log("Error con el servidor");
        }
      },
      (error) => console.log(error)
      );
  }


}
