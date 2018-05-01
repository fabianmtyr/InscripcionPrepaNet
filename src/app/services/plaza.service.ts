import { Injectable } from '@angular/core';
import { Plaza } from '../models/plaza.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlazaService {
  private backend = "https://ipn-backend.herokuapp.com";

  constructor(private http: HttpClient) { 

  }


  editPlaza(plaza: Plaza) {
    return this.http.post(this.backend + '/plazas/edit', plaza);
  }

  getPlaza():Observable<any>{
  	return this.http.get(this.backend + '/plazas/list');
  }

}
