import { Component, OnInit, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
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

	campus:string[] = [
		'AGS',
		'CCM',
		'CCV',
		'CDJ',
		'CEM',
		'CHI',
		'CHS',
		'CSF',
		'CVA',
		'MTY',
		'GDA',
		'HGO',
		'IRA',
		'LAG',
		'LEO',
		'MRL',
		'PUE',
		'QRO',
		'SAL',
		'SIN',
		'SLP',
		'TAM',
		'TOL',
		'ZAC',
	];

	tutorForm: FormGroup;
	//tutor: Tutor;

	//tutor = new Tutor();

  constructor(private tutorService: TutorService, private fb: FormBuilder) {
  	this.createForm();
  }

  createForm() {
  	this.tutorForm = this.fb.group({
  		matricula: ['', Validators.required],
  		name: this.fb.group({
  			first: ['', Validators.required],
  			last: ['', Validators.required]
  		}),
      correo: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
  		email: ['',  Validators.pattern("[^ @]*@[^ @]*")],
  		grades: '',
  		course: '',
  		campus: ['', Validators.required]
  	});
  }

  //get diagnostic() { return JSON.stringify(this.tutor);}

  ngOnInit() {
  	
  }

  addTutor() {
  	let tutor = new Tutor();
  	tutor = this.tutorForm.value;
  	
  	this.tutorService.registerTutor(tutor).subscribe(
  		(response) => {
  			console.log(response);
  			console.log("Se agrego tutor exitosamente");
  			this.tutorForm.reset();
  		},
  		(error) => {
  			console.log(error);
  			console.log("No se pudo enviar forma.");
  		});
  		
  }


}
