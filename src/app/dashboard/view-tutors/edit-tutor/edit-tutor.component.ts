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


  constructor(public dialogRef: MatDialogRef<EditTutorComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private tutorService: TutorService) {}

  nTutor = new Tutor();

  ngOnInit() {
    console.log("Hola")
    console.log(this.nTutor)
    console.log("Adios")
	this.nTutor.matricula = "A00000016";
	this.nTutor.name = {first: this.data.datos.name.first, last: this.data.datos.name.last}
	this.nTutor.email = this.data.datos.correo;
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
