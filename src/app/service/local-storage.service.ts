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
  
  storeReadOnlyUserDetails(code : string, authResponse : AuthResponse){
    this.set("userId",authResponse.userId);
    this.set("userName",authResponse.userName);
    this.set("readOnlyCode",code);
  }
  storeWriteOnlyUserDetails(code : string, authResponse : AuthResponse){
    this.set("userId",authResponse.userId);
    this.set("userName",authResponse.userName);
    this.set("writeOnlyCode",code);
  }
  getUserDetails() : UserDetails{
    return {
      userName: this.get('userName'),
      userId: this.get('userId'),
      writeOnlyCode : this.get('writeOnlyCode'),
      readOnlyCode : this.get('readOnlyCode'),
    }

  }
}
