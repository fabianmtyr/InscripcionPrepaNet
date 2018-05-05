import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogActions} from '@angular/material';
import { UserService } from '../../../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.css']
})
export class EditarMateriaComponent implements OnInit {

  constructor(private http: HttpClient,public dialogRef: MatDialogRef<EditarMateriaComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private userService: UserService)
  { }
  
  nMateria = {"clave":'XXXX' , "nombre":'XXXX', "periodo":-1}
  Usercampus = this.userService.getLocalStorageCampus()
  @ViewChild('editMateriaForm') form:  any;
  
  ngOnInit() {
       	this.nMateria.clave = this.data.clave;
        this.nMateria.nombre = this.data.nombre;
        this.nMateria.periodo = this.data.periodo;
  	console.log(this.nMateria);
      
  }
  
  openWarning(){

    let dialogRef = this.dialog.open(WarnComponent, {
      data: this.nMateria,
      disableClose: true,
    });
    
    dialogRef.afterClosed().subscribe(data => {
      if (data){
        this.eliminarMateria();
      };
    });
  }

  eliminarMateria() {
          let clave1 = {'clave': this.nMateria.clave}
      this.http.post("https://ipn-backend.herokuapp.com/materias/remove", clave1).subscribe(
      (response) => {
        console.log(response);
        console.log("Se elimino materia");
      },
      (error) => {
        console.log(this.nMateria)
        console.log(error);
        console.log("No se pudo eliminar");
        this.dialogRef.close();
      }); 
  }

  closeDialog(): void {
    //this.form.reset();
    this.dialogRef.close();
  }

}





@Component({
  selector: 'warning-dialog',
  template: `

  <div>
    <p>
      <strong>Estas a punto de borrar a la siguiente materia:</strong></p>
      <ul>
        <li>{{data.clave}}</li>
        <li>{{data.nombre}}</li>
      </ul>
    
    <p>
      <strong>Esta accion no se puede revertir. ¿Estas seguro que quieres continuar?</strong>
    </p>
    <button class="btn" (click)=closeDialog()>Cancelar</button>
    <button class="btn" (click)="acceptWarning()">Borrar Materia</button>
  </div>
  `,
  providers: []
})

export class WarnComponent {

  constructor(
    public dialogRef: MatDialogRef<WarnComponent>,
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
