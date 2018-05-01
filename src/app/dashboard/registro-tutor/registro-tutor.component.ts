import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tutor } from '../../models/tutor.model';
import { TutorService } from '../../services/tutor.service';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { FiltroMaterias } from './filtroMaterias.pipe';

@Component({
  selector: 'app-registro-tutor',
  templateUrl: './registro-tutor.component.html',
  styleUrls: ['./registro-tutor.component.css']
})
export class RegistroTutorComponent implements OnInit {


	tutorForm: FormGroup;
  campuss:string[] = [
    'AGS','CCM','CCV','CDJ','CEM','CHI','CHS','CSF','CVA','MTY','GDA','HGO','IRA','LAG','LEO','MRL', 'PRN', 'PUE','QRO','SAL','SIN','SLP','TAM','TOL','ZAC'];

  materiass = [' ']
  listaMaterias:Observable<any>;
  private mat1: string = '';
  private mat2: string = '';
  private mat3: string = '';

  constructor(private tutorService: TutorService, private fb: FormBuilder, public dialog: MatDialog) {
  	//this.createForm();
  }

  createForm() {
  	this.tutorForm = this.fb.group({
  		matricula: ['', [Validators.required, Validators.pattern("^[A|a][0-9]{8}")]],
  		nombre: this.fb.group({
  			nombre: ['', Validators.required],
  			apellido: ['', Validators.required]
  		}),
  		correo: ['', [Validators.required, Validators.pattern("[^ @\n,;]+@[^ @\n,;]+[\.][^ @\n,;]+")]],
      campus: ['', Validators.required],
      materias: this.fb.group({
        // materia1: ['', [Validators.required, Validators.pattern("^[A-Za-z]+")]],
        // materia2: ['', [Validators.required, Validators.pattern("^[A-Za-z]+")]],
        // materia3: ['', [Validators.required, Validators.pattern("^[A-Za-z]+")]],
        materia1: [''],
        materia2: [''],
        materia3: [''],
      }),
  	});
  }

  get diagnostic() { return JSON.stringify(this.tutorForm);}

  ngOnInit() {
  	this.tutorService.getAllMaterias().subscribe((response) =>{
      this.listaMaterias = response;
      response.forEach((item) => this.materiass.push(item.nombre));
      console.log("materiass", this.materiass)
      console.log(this.listaMaterias)
      this.createForm()
    });
    this.createForm()
  }

  openSuccess(message, title){
    let dialogRef = this.dialog.open(SuccessComponent, {
      data: {m: message, t: title},
      disableClose: true,
    });
  }

  addTutor() {
    
  	let tutor = new Tutor();
  	tutor = this.tutorForm.value;
    //console.log(tutor)
    
  	this.tutorService.registerTutor(tutor).map((lista) => {
    }).subscribe(
  		(response) => {
  			console.log(response);
  			console.log("Se agrego tutor exitosamente");
        this.openSuccess("Se agrego tutor exitosamente!",'Exito!');
  			this.tutorForm.reset();
  		},
  		(error) => {
  			console.log(error.error.text);
        this.openSuccess(error.error.text, 'Error')
  			console.log("No se pudo enviar forma.");
  		});
  }
}

@Component({
  selector: 'success-dialog',
  template: `

  <div>
    <p><strong>{{this.data.t}}</strong></p>
    <p>
      <strong>{{this.data.m}}</strong>
    </p>
    <button (click)="closeDialog()">Ok</button>
  </div>
  `,
  providers: []
})
export class SuccessComponent {

  constructor(
    public dialogRef: MatDialogRef<SuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}