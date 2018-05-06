import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogActions} from '@angular/material';
import { Tutor } from '../../../models/tutor.model';
import { TutorService } from '../../../services/tutor.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-editar-tutores',
  templateUrl: './editar-tutores.component.html',
  styleUrls: ['./editar-tutores.component.css']
})
export class EditarTutoresComponent implements OnInit {

    campuss:string[] = [
    'AGS','CCM','CCV','CDJ','CEM','CHI','CHS','CSF','CVA','MTY','GDA','HGO','IRA','LAG','LEO','MRL', 'PRN', 'PUE','QRO','SAL','SIN','SLP','TAM','TOL','ZAC'];

    semesterss: number[] = [1,2,3,4,5,6,7,8,9,10];

    periodos: string[] = ['enero-abril', 'mayo-agosto', 'septiembre - diciembre'];


  constructor(public dialogRef: MatDialogRef<EditarTutoresComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private tutorService: TutorService, public dialog: MatDialog, private userService: UserService) { }

  nTutor = new Tutor();
  Usercampus = this.userService.getLocalStorageCampus()
  @ViewChild('editTutorForm') form:  any;

  ngOnInit() {
 	this.nTutor.matricula = this.data.matricula;

	this.nTutor.nombre = {nombre: this.data.nombre.nombre, apellido: this.data.nombre.apellido}
  	this.nTutor.correo = this.data.correo;
  	this.nTutor.campus = this.data.campus;
  	this.nTutor.promedio = this.data.promedio;
  	this.nTutor.calificacionCurso = this.data.calificacionCurso;
    this.nTutor.semestre = this.data.semestre;
    this.nTutor.carrera = this.data.carrera;
    this.nTutor.periodo = this.data.periodo;
  	console.log(this.nTutor);
  }

    editarTutor() {

    
    this.tutorService.editTutor(this.nTutor).subscribe(
      (response) => {
        console.log(response);
        console.log("Se edito tutor exitosamente!");
        this.form.reset();
        this.dialogRef.close();
      },
      (error) => {
        console.log(error);
        console.log("No se pudo enviar forma.");
      });
      

  }

  openWarning(){

    let dialogRef = this.dialog.open(WarningComponent, {
      data: this.nTutor,
      disableClose: true,
    });
    
    dialogRef.afterClosed().subscribe(data => {
      if (data){
        this.eliminarTutor();
      };
    });
  }

  eliminarTutor() {
    this.tutorService.removeTutor(this.nTutor.matricula).subscribe(
      (response) => {
        console.log(response);
        console.log("Se elimino tutor");
      },
      (error) => {
        console.log(this.nTutor)
        console.log(error);
        console.log("No se pudo enviar forma");
        this.dialogRef.close();
      }); 
  }

  closeDialog(): void {
    this.form.reset();
  	this.dialogRef.close();
  }

}

@Component({
  selector: 'warning-dialog',
  template: `

  <div>
    <p>
      <strong>Estas a punto de borrar al siguiente candidato a tutor:</strong></p>
      <div class="center">
      <p>Nombre: {{data.nombre.nombre}} {{data.nombre.apellido}}
      <br>
      Matricula: {{data.matricula}}
      </p>
      </div>
    <p>
      <strong>Esta accion no se puede revertir. ¿Estas seguro que quieres continuar?</strong>
    </p>
    <button class="btn" (click)=closeDialog()>Cancelar</button>
    <button class="btn" (click)="acceptWarning()">Borrar Tutor</button>
  </div>
  `,
  providers: []
})
export class WarningComponent {

  constructor(
    public dialogRef: MatDialogRef<WarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  closeDialog() {
    this.dialogRef.close(false);
  }

  acceptWarning(){
    this.dialogRef.close(true);
  }



}