import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SuccessComponent } from '../registro-tutor/registro-tutor.component';


@Component({
  selector: 'app-registro-admins',
  templateUrl: './registro-admins.component.html',
  styleUrls: ['./registro-admins.component.css']
})
export class RegistroAdminsComponent implements OnInit {

      campuss:string[] = [
    'AGS','CCM','CCV','CDJ','CEM','CHI','CHS','CSF','CVA','MTY','GDA','HGO','IRA','LAG','LEO','MRL','PRN','PUE','QRO','SAL','SIN','SLP','TAM','TOL','ZAC'];

  model = new User();
  @ViewChild('adminForm') form: any;
  public passwordVerify: string;
  submitted = false;
  fname: string;
  lname: string;

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
  }


  onSubmit() {
    this.submitted = true;
  }
  
  openSuccess(message, title){
    let dialogRef = this.dialog.open(SuccessComponent, {
      data: {m: message, t: title},
      disableClose: true,
    });

  }

  addUser() {
    this.submitted = true;
    console.log(this.model);
    this.model.name = this.fname + " " + this.lname;

    this.userService.registerUser(this.model).subscribe(
      (response) => {
        console.log(response);
        console.log("Se agrego usuario");
        this.openSuccess("Se agrego tutor exitosamente!", "Exito!")
        this.model = new User();
        this.form.reset()
      },
      (error) => {
        console.log(error);
        this.openSuccess(error.error.text, "Error")
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
