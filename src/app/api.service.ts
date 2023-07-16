import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, AuthResponse, DatesWithResourceResponse, VsUiConstants } from './vsuiconst';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getDatesAndResources() : Observable<DatesWithResourceResponse>{
    //const url = VsUiConstants.BASE_IMAGE_URL_LOCAL+"dates/details"; 
    const url = VsUiConstants.BASE_IMAGE_URL_LOCAL+"event/TJE3T7B";
    return this.http.get<DatesWithResourceResponse>(url);
  }

  public isReadOnlyCodeValid(code : string) : Observable<AuthResponse> {
    const url = VsUiConstants.BASE_IMAGE_URL_LOCAL+"auth/read";
    return this.http.post<AuthResponse>(url, { code: code });
  }
  public isWriteOnlyCodeValid(code : string){
    const url = VsUiConstants.BASE_IMAGE_URL_LOCAL+"auth/write";
    return this.http.post<AuthResponse>(url, { code: code });
  }
}
