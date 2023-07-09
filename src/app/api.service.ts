import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatesWithResourceResponse, VsUiConstants } from './vsuiconst';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getDatesAndResources() : Observable<DatesWithResourceResponse>{
     const url = VsUiConstants.BASE_IMAGE_URL_LOCAL+"dates/details";
    return this.http.get<DatesWithResourceResponse>(url);
  }
}
