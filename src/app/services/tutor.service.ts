import { Injectable } from '@angular/core';
import { Tutor } from '../models/tutor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TutorService {
  private backend = "https://ipn-backend.herokuapp.com";

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
    return this.http.post(this.backend + '/tutors/edit', tutor);
  }

  removeTutor(matricula: string){
    let matricula1 = {'matricula': matricula }
    return this.http.post(this.backend + '/tutors/remove', matricula1)

  }

  sendMail(tipo){
    return this.http.post(this.backend + '/tutors/sendMail', tipo)
  }

}
