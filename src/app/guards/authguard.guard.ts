import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthguardGuard implements CanActivate {
	constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //return this.user.getUserLoggedIn();
    return this.userService.isLoggedIn.take(1).map((isLoggedIn: boolean) => {
    	if(!isLoggedIn){
    		this.router.navigate(['/login']);
    		return false;
    	}
    	return true;
    });
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
	constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //return this.user.getUserLoggedIn();
    return this.userService.isLoggedIn.take(1).map((isLoggedIn: boolean) => {
    	if(isLoggedIn){
    		this.router.navigate(['/dashboard']);
    		return false;
    	}
    	return true;
    });
  }
}