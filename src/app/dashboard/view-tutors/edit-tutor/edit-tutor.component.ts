import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Candidato } from '../../../models/candidato.model';
import { RegistroService } from '../../../services/registro.service';
@Component({
  selector: 'app-edit-tutor',
  templateUrl: './edit-tutor.component.html',
  styleUrls: ['./edit-tutor.component.css']
})
export class EditTutorComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<EditTutorComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private registroService: RegistroService) { }

  tutor = new Candidato();

  ngOnInit() {
	this.tutor.matricula = this.data.datos.matricula;
	this.tutor.name = this.data.datos.name.first;
	this.tutor.lastnames = this.data.datos.name.last;
	this.tutor.correo = this.data.datos.correo;
  }

  editTutor(){
  	this.registroService
  }

  closeDialog(): void {
  	this.dialogRef.close();
  }

}
