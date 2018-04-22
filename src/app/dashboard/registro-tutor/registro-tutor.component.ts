import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tutor } from 'app/models/tutor.model';
import { TutorService } from 'app/services/tutor.service';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-registro-tutor',
  templateUrl: './registro-tutor.component.html',
  styleUrls: ['./registro-tutor.component.css']
})
export class RegistroTutorComponent implements OnInit {


	tutorForm: FormGroup;
	//tutor: Tutor;

	//tutor = new Tutor();

  constructor(private tutorService: TutorService, private fb: FormBuilder, public dialog: MatDialog) {
  	this.createForm();
  }

  createForm() {
  	this.tutorForm = this.fb.group({
  		matricula: ['', [Validators.required, Validators.pattern("^[A|a][0-9]{8}")]],
  		name: this.fb.group({
  			first: ['', Validators.required],
  			last: ['', Validators.required]
  		}),
  		email: ['', [Validators.required, Validators.pattern("[^ @\n,;]+@[^ @\n,;]+[\.][^ @\n,;]+")]],
  	});
  }

  //get diagnostic() { return JSON.stringify(this.tutor);}

  ngOnInit() {
  	
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
    
  	this.tutorService.registerTutor(tutor).subscribe(
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