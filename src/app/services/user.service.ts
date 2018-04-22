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
  //private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { 
  	//this.isUserLoggedIn = false;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!sessionStorage.getItem('token');
  }

  tokenInfo() {
    return sessionStorage.getItem('token');
  }

  getLocalStorageName(){
    return JSON.parse(this.tokenInfo()).name;
  }

  getLocalStorageEmail(){
    return JSON.parse(this.tokenInfo()).email;
  }

  getLocalStorageCampus(){
    return JSON.parse(this.tokenInfo()).campus;
  }


  setUserLoggedIn(email, campus, name) {
  	//this.isUserLoggedIn = true;
    let userIdentifier = {'name': name, 'email':email, 'campus': campus}
    sessionStorage.setItem('token', JSON.stringify(userIdentifier));
    this.loggedIn.next(true);
    this.router.navigate(['/dashboard']);
  }

  setUserLoggedOut() {
    sessionStorage.removeItem('token');
    //localStorage.clear();
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
