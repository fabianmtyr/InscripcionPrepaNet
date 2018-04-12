import { Component, OnInit, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';


@Component({
  selector: 'app-registro-admins',
  templateUrl: './registro-admins.component.test.html',
  styleUrls: ['./registro-admins.component.css']
})
export class RegistroAdminsComponent implements OnInit {

  model = new User();
  public passwordVerify: string;
  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  get diagnostic() { return JSON.stringify(this.model);}

  onSubmit() {
    this.submitted = true;
  }
  
    addUser() {
      this.submitted = true;
    //console.log(this.user);

    this.userService.registerUser(this.model).subscribe(
      (response) => {
        console.log(response);
        console.log("Se agrego usuario");
        alert("Usuario creado exitosamente.");
        this.model = new User();
      },
      (error) => {
        console.log(error);
        console.log("No se pudo enviar forma.");
      });
  }
  
/*
  user: User;

	registerAdminForm: FormGroup;
	fname: FormControl;
	lname: FormControl;
	email: FormControl;
	password: FormControl;
	passwordVerify: FormControl;

  public popoverTitle: string = 'Usuario Agregado Exitosamente';
  public confirmClicked: boolean = false;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = new User();
  	this.createFormControls();
  	this.createForm();
  }

  createFormControls() {
  	this.fname = new FormControl('', Validators.required);
  	this.lname = new FormControl('', Validators.required);
  	this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
  	this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  	this.passwordVerify = new FormControl('', [Validators.required, Validators.minLength(6)]);
  }

  createForm() {
  	this.registerAdminForm = new FormGroup({
  		fname: this.fname,
  		lname: this.lname,
  		email: this.email,
  		password: this.password,
  		passwordVerify: this.passwordVerify
  	});
  }

  addUser() {
    console.log(this.user);

    this.userService.registerUser(this.user).subscribe(
      (response) => {
        console.log(response);
        console.log("Se agrego usuario");
        alert("Usuario creado exitosamente.");
        this.user = new User();
        this.registerAdminForm.reset();
      },
      (error) => {
        console.log(error);
        console.log("No se pudo enviar forma.");
      });
  }
  */
}
