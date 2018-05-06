import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
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

  // arreglo que guarda valores que se van a desplegar
  // en la barra de seleccion de campus
  campuss:string[] = [
    'AGS','CCM','CCV','CDJ','CEM','CHI','CHS','CSF','CVA','MTY','GDA','HGO','IRA','LAG','LEO','MRL','PRN','PUE','QRO','SAL','SIN','SLP','TAM','TOL','ZAC'];

  //objeto de modelo usuario que guarda los valores ingresados en la forma 
  // despues se manda este objeto al servidor
  model = new User();

  // View child que se usa para pasar los datos de este
  // componente a la venta de dialogo
  @ViewChild('adminForm') form: any;

  // se usa para guardar el valor del input de confirmacion
  // de contraseña y se compara contra la del modelo
  public passwordVerify: string;

  // checa si ya se mando la forma
  submitted = false;

  // almacena el nombre y apellido del registro para luego hacer un string
  fname: string;
  lname: string;

  constructor(public userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  // se ejecuta cuando se envia la forma
  onSubmit() {
    this.submitted = true;
  }
  
  // se usa para abrir la ventana de dailogo 
  openSuccess(message, title){
    let dialogRef = this.dialog.open(SuccessComponent, {
      data: {m: message, t: title},
      disableClose: true,
    });

  }

  // funcion que se corre cuando se madna la forma
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
}
