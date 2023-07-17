import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, AuthResponse, DatesWithResourceResponse, VsUiConstants } from './vsuiconst';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //baseUrl = VsUiConstants.BASE_IMAGE_URL_LOCAL;
  baseUrl = VsUiConstants.BASE_IMAGE_URL_PROD;
  constructor(private http: HttpClient, private localStorageService : LocalStorageService) { }

  public getDatesAndResources() : Observable<DatesWithResourceResponse>{
    //const url = VsUiConstants.BASE_IMAGE_URL_LOCAL+"dates/details"; 
    const url = this.baseUrl+"event/"+(this.localStorageService.getUserDetails().godModeCode);
    return this.http.get<DatesWithResourceResponse>(url);
  }

  public isReadOnlyCodeValid(code : string) : Observable<AuthResponse> {
    const url = this.baseUrl+"auth/read";
    return this.http.post<AuthResponse>(url, { code: code });
  }
  public isWriteOnlyCodeValid(code : string){
    const url = this.baseUrl+"auth/write";
    return this.http.post<AuthResponse>(url, { code: code });
  }
}
