import { Injectable } from '@angular/core';
import { Candidato } from '../models/candidato.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorHandler } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    //'Content-Type':  'application/json',
    //'Accept': '*/*'
})};


@Injectable()
export class RegistroService {

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
      return this.http.post('http://ipn-backend.herokuapp.com/api/tutors', JSON.stringify(candidato), httpOptions);
  }

}
