import { Injectable } from '@angular/core';
import { Tutor } from '../models/tutor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TutorService {
  private backend = "https://ipn-backend.herokuapp.com";
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { 

  }

  registerTutor(tutor: Tutor) {
    return this.http.post(this.backend + '/tutors/new', tutor);
  }

  getTutors() {
    return this.http.get(this.backend + '/tutors/list');
  }

  getAllTutors():Observable<any> {
    return this.http.get(this.backend + '/tutors/list');
  }

  getAllTutors2():Observable<any> {
    return this.http.get(this.backend + '/tutors/list').map((res: Response) => res.json());
  }

  editTutor(tutor: Tutor) {
    return this.http.post(this.backend + '/tutors/edit', tutor, this._options);
  }

  removeTutor(matricula: string){
    let matricula1 = {'matricula': matricula }
    return this.http.post(this.backend + '/tutors/remove', matricula1)

  }

  sendMail(tipo){
    return this.http.post(this.backend + '/tutors/sendMail', tipo, this._options)
  }

  getAllMaterias():Observable<any> {
    return this.http.get(this.backend + '/materias/list');
  }

  generaBB(){
    return this.http.get(this.backend + '/tutors/updateBb');
  }

}
