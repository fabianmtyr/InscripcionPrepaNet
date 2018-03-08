import { Injectable } from '@angular/core';
import { User } from 'app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  protected backend: string;
  protected headers: HttpHeaders;

	private isUserLoggedIn;

  apiRoot: string = "https://ipn-backend.heroku";
  results: User;

  constructor(private http: HttpClient) { 
  	this.isUserLoggedIn = false;
    this.results = new User;
    this.backend = "https://ipn-backend.herokuapp.com";
  }

  setUserLoggedIn() {
  	this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
  	return this.isUserLoggedIn;
  }

/*
  loginP(userP: User) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.backend}/user.login`;
      this.http.get(apiURL).toPromise().then(
        res => { 
          console.log(res.json());
          resolve();
        }
        );
    });
    return promise;
  }
*/
  login(user: User) {
    return this.http.post(this.backend + '/user/login', user);
  }

}
