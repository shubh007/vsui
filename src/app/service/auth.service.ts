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
    if((state.url === '/') && this.isNonLoggedIn(activeRoute,state)){
      return true;
    }
    else if((state.url === '/') && !this.isNonLoggedIn(activeRoute,state)){
      this.router.navigate(['/view']);
      return false;
    }else if (!this.isLoggedIn(activeRoute,state)) {
      this.router.navigate(['']);
      return false;
    }else {
      return true;
    }
  }

  isNonLoggedIn(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
      const userDetails = this.localStorageService.getUserDetails();
      return (userDetails === null || userDetails === undefined
         || (userDetails.readOnlyCode === null || userDetails.readOnlyCode === undefined)&&
         ( userDetails.writeOnlyCode === null || userDetails.writeOnlyCode === undefined));
  }
  isLoggedIn(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
    if(state.url === '/view'){
      const userDetails = this.localStorageService.getUserDetails();
      if(userDetails === null || userDetails === undefined
         || userDetails.readOnlyCode === null || userDetails.readOnlyCode === undefined){
        return false;
      }
      return true;
    }
    if(state.url === '/upload'){
      const userDetails = this.localStorageService.getUserDetails();
      if(userDetails === null || userDetails === undefined
         || userDetails.writeOnlyCode === null || userDetails.writeOnlyCode === undefined){
        return false;
      }
      return true;
    }
    return false;
  }
}
