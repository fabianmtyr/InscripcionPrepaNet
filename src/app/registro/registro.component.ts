import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from '../services/registro.service';
import { Candidato } from '../models/candidato.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

candidatoModel = new Candidato;

  constructor(private router:Router, private registro:RegistroService) { }

  registraCandidato(){
      
    var nme = this.candidatoModel.name;
    var lnme = this.candidatoModel.lastnames;
    var mail = this.candidatoModel.correo;
    var mat = this.candidatoModel.matricula;

  	if(true) {
  		this.registro.register(this.candidatoModel).subscribe();
  		this.router.navigate(['dashboard']);
  	}
  }
  
  
    ngOnInit() {
  

    }   
}
