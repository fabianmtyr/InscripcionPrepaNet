import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from '../../services/registro.service';
import { Candidato } from '../../models/candidato.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

candidatoModel = new Candidato;
saveSuccess: boolean = false;

  constructor(private router:Router, private registro:RegistroService) { }

  registraCandidato(){
      
    var nme = this.candidatoModel.name;
    var lnme = this.candidatoModel.lastnames;
    var mail = this.candidatoModel.correo;
    var mat = this.candidatoModel.matricula;

  	if(true) {
  		this.registro.register(this.candidatoModel).subscribe(data => {
                    if(data){this.saveSuccess = true}
                    else{this.saveSuccess = false}
                    
                });
  		//this.router.navigate(['dashboard']);
  	}
  }
  
  
    ngOnInit() {
        //this.registroForm = new FormGroup({
        
        
    
    }   
}
