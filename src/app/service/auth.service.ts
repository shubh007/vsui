import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private router: Router,private localStorageService : LocalStorageService) { }
  
  canActivate(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(" state.url "+state.url);
    if(state.url === '/login'){
      if(this.isLoggedIn(activeRoute,state)){
        this.router.navigate(['']);
        return false;
      }else{
        return true;
      }
    }else if(state.url === '/'){
      if(this.isLoggedIn(activeRoute,state)){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
    }else{
      if(this.isLoggedIn(activeRoute,state)){
        this.router.navigate(['/']);
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
    }
  }

  isLoggedIn(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
      const userDetails = this.localStorageService.getUserDetails();
      return (userDetails != null && userDetails != undefined
        && userDetails.godModeCode != null && userDetails.godModeCode != undefined);
  }
}
