import { Injectable } from '@angular/core';
import { AuthResponse, UserDetails } from '../vsuiconst';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  set(key: string, value: any) {
      localStorage.setItem(key, value);
  }

  get(key: string) {
      return localStorage.getItem(key);
  }

  remove(key: string) {
      localStorage.removeItem(key);
  }
  
  storeUserDetails(godModeCode : string, authResponse : AuthResponse){
    this.set("userId",authResponse.userId);
    this.set("userName",authResponse.userName);
    this.set("godModeCode",godModeCode);
  }
  clearUserDetails(){
    this.remove("userId");
    this.remove("userName");
    this.remove("godModeCode");
  }

  getUserDetails() : UserDetails{
    return {
      userName: this.get('userName'),
      userId: this.get('userId'),
      godModeCode : this.get('godModeCode'),
    }

  }
}
