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

  editTutor(tutor: Tutor) {
    return this.http.post(this.backend + '/tutors/edit', tutor);
  }

}
