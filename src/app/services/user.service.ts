import { Injectable } from '@angular/core';
import { User, UserResponse } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private backend = "https://ipn-backend.herokuapp.com";
	//private isUserLoggedIn;
	public currentUser;
  //private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { 
  	//this.isUserLoggedIn = false;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  tokenEmail() {
    return localStorage.getItem('token');
  }

  setUserLoggedIn(email) {
  	//this.isUserLoggedIn = true;
    localStorage.setItem('token', email);
    this.loggedIn.next(true);
    console.log(email);
    this.currentUser = email;
    this.router.navigate(['/dashboard']);
  }

  setUserLoggedOut() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

   login(user: User) {
    return this.http.post<UserResponse>(this.backend + '/user/login', user);
  }

  registerUser(user: User) {
    return this.http.post(this.backend + '/user/register', user);
  }

}
