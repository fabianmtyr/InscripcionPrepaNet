import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tutor } from '../../../models/tutor.model';
import { TutorService } from '../../../services/tutor.service';
@Component({
  selector: 'app-edit-tutor',
  templateUrl: './edit-tutor.component.html',
  styleUrls: ['./edit-tutor.component.css']
})
export class EditTutorComponent implements OnInit {

    campuss:string[] = ['AGS','CCM','CCV','CDJ','CEM','CHI','CHS','CSF','CVA','MTY','GDA','HGO','IRA','LAG','LEO','MRL','PRN','PUE','QRO','SAL','SIN','SLP','TAM','TOL','ZAC'];


  constructor(public dialogRef: MatDialogRef<EditTutorComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private tutorService: TutorService) {}

  nTutor = new Tutor();

  ngOnInit() {
	this.nTutor.matricula = this.data.datos.matricula;
	this.nTutor.nombre = {nombre: this.data.datos.nombre.nombre, apellido: this.data.datos.nombre.apellido}
  this.nTutor.correo = this.data.datos.correo;
  this.nTutor.campus = this.data.datos.campus;
  console.log(this.nTutor);
  }

  editarTutor() {
    
    this.tutorService.editTutor(this.nTutor).subscribe(
      (response) => {
        console.log(response);
        console.log("Se edito tutor exitosamente!");
        this.dialogRef.close();
      },
      (error) => {
        console.log(error);
        console.log("No se pudo enviar forma.");
      });
      

  }

  closeDialog(): void {
  	this.dialogRef.close();
  }

}
