import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddToEventResponse, ApiResponse, AuthResponse, CreateEventRequest, CreateEventResponse, DatesWithResourceResponse, VsUiConstants } from './vsuiconst';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //baseUrl = VsUiConstants.BASE_IMAGE_URL_LOCAL;
  baseUrl = VsUiConstants.BASE_IMAGE_URL_PROD;
  constructor(private http: HttpClient, private localStorageService : LocalStorageService) { }

  public createEvent(date : Date, message : string) : Observable<CreateEventResponse>{
    let createEventRequest = {
      userId: this.localStorageService.getUserDetails().userId,
      code: this.localStorageService.getUserDetails().godModeCode,
      date: date,
      message: message,
    } as CreateEventRequest;
    const url = this.baseUrl+"event";
    return this.http.post<CreateEventResponse>(url,createEventRequest);
  }
  public addToEvent(eventId : string, eventFile : File) : Observable<AddToEventResponse>{
    let addToEventRequest = new FormData();
    addToEventRequest.append("userId", this.localStorageService.getUserId());
    addToEventRequest.append("code", this.localStorageService.getGodModeCode());
    addToEventRequest.append("eventId", eventId);
    addToEventRequest.append("eventFile", eventFile);
    const url = this.baseUrl+"event";
    return this.http.put<AddToEventResponse>(url,addToEventRequest);
  }

  public getDatesAndResources() : Observable<DatesWithResourceResponse>{
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
