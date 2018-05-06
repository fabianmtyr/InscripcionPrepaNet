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

    // arreglo que contiene los campuses que se pueden
    // en la barra de seleccion de campus
    campuss:string[] = [
    'AGS','CCM','CCV','CDJ','CEM','CHI','CHS','CSF','CVA','MTY','GDA','HGO','IRA','LAG','LEO','MRL', 'PRN', 'PUE','QRO','SAL','SIN','SLP','TAM','TOL','ZAC'];

    // igual que arreglo campuss pero para semestre
    semesterss: number[] = [1,2,3,4,5,6,7,8,9,10];

    // lo mismo que los dos arreglos anteriores pero para
    // los periodos.
    periodos: string[] = ['enero-abril', 'mayo-agosto', 'septiembre - diciembre'];


  constructor(public dialogRef: MatDialogRef<EditarTutoresComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private tutorService: TutorService, public dialog: MatDialog, private userService: UserService) { }

  // se declara un objeto tutor para descargar los datos a un modelo
  nTutor = new Tutor();

  // almacena el campus registrado en la cuenta de usuario activa
  Usercampus = this.userService.getLocalStorageCampus()

  // view child para regresar informacion al componente de desplegar tutores
  @ViewChild('editTutorForm') form:  any;

  ngOnInit() {

    // Carga todos los datos que se pasaron desde la tabla de despegar
    // tutores al objeto tutor que se declaro en este componente
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

  // funcion que corre cuando se hace clic en aceptar
  // manda la forma al servidor para que actualice los datos
  // del tutor seleccionado
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

  // ventana de dialogo que se abre cuando se hace clic
  // en borrar tutor. Si se hace clic en si llama la funcion
  // eleimarTutor
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

  // Funcion que manda la forma para eliminar tutor al servidor
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

  // Funcion para reinicializar la forma y cerrar el dialogo
  closeDialog(): void {
    this.form.reset();
  	this.dialogRef.close();
  }

}

// Componente para la ventana de dialogo de alert
// contiene el html que se va a desplegar en la ventana de dialogo.
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

  // evita que se cierre la ventana cuando se hace clic fuera de los margenes
  onNoClick(): void {
    this.dialogRef.close();
  }

  // se ejecuta cuando se hace clic en cancelar
  closeDialog() {
    this.dialogRef.close(false);
  }

  // se ejecuta cuando se hace clic en aceptar
  acceptWarning(){
    this.dialogRef.close(true);
  }



}