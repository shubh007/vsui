import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private router: Router) { }
  
  canActivate(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.isLoggedIn(activeRoute,state)) {
      this.router.navigate(['']);
      return true;
    }
    return true;
  }


  isLoggedIn(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
    if(state.url === '/view'){
      return true;
    }
    if(state.url === '/upload'){
      return false;
    }
    return true;
  }
}
