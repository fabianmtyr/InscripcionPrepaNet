import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tutor } from '../../../models/tutor.model';
import { TutorService } from '../../../services/tutor.service';

@Component({
  selector: 'app-editar-tutores',
  templateUrl: './editar-tutores.component.html',
  styleUrls: ['./editar-tutores.component.css']
})
export class EditarTutoresComponent implements OnInit {

    campuss:string[] = [
    'AGS','CCM','CCV','CDJ','CEM','CHI','CHS','CSF','CVA','MTY','GDA','HGO','IRA','LAG','LEO','MRL','PUE','QRO','SAL','SIN','SLP','TAM','TOL','ZAC'];


  constructor(public dialogRef: MatDialogRef<EditarTutoresComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private tutorService: TutorService) { }

  nTutor = new Tutor();

  ngOnInit() {
 	this.nTutor.matricula = this.data.matricula;
	this.nTutor.name = {first: this.data.name.first, last: this.data.name.last}
  	this.nTutor.email = this.data.email;
  	this.nTutor.campus = this.data.campus;
  	this.nTutor.average = this.data.average;
  	this.nTutor.courseGrade = this.data.courseGrade;
  	this.nTutor.isElegible = this.data.isElegible;
  	this.nTutor.isTutor = this.data.isTutor;
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
