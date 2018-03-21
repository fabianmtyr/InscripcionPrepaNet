import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

	private isUserLoggedIn;
	private username;

  constructor(private http: HttpClient) { 
  	this.isUserLoggedIn = true;
  }

  setUserLoggedIn() {
  	this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
  	return this.isUserLoggedIn;
  }

  login(user:User): Observable<any> {
    return this.http.post('liga de backend de user', user, {withCredentials: true});
  }

}
