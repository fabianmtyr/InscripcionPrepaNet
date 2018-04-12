import { Injectable } from '@angular/core';
import { Candidato } from '../models/candidato.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorHandler } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    //'Access-Control-Request-Method':'POST',
    //'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json',
    'Accept': '*/*'
    
})};


@Injectable()
export class RegistroService {
  private backend = "https://ipn-backend.herokuapp.com";
	private isRegistered;
	private username;

  constructor(private http: HttpClient) { 
  	this.isRegistered = false;
  }

  setCandidatoRegistered() {
  	this.isRegistered = true;
  }

  getCandidatoRegistered() {
  	return this.isRegistered;
  }

  register(candidato:Candidato): Observable<any> {
      console.log(JSON.stringify(candidato))
      let tstJson = {name: {
          first: candidato.name,
          last: candidato.lastnames
    },
          matricula: candidato.matricula, 
          email: candidato.correo}
          
      //return this.http.post('http://localhost:8080/tutors/new', tstJson, httpOptions);
      //return this.http.post('http://localhost:8080/tutors/new', JSON.stringify(candidato), httpOptions);
      return this.http.post('https://ipn-backend.herokuapp.com/tutors/new', tstJson, httpOptions);
  }

  getTutors() {
    return this.http.get(this.backend + '/tutors/list');
  }
}
