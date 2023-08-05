import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddToEventResponse, ApiResponse, AuthResponse, CreateEventRequest, CreateEventResponse, DatesWithResourceResponse, MemoryFileAndMetaUploadRequest, VsUiConstants } from './vsuiconst';
import { HttpClient, HttpHeaders,HttpEventType,HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { LocalStorageService } from './service/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //baseUrl = VsUiConstants.BASE_IMAGE_URL_LOCAL;
  baseUrl = VsUiConstants.BASE_IMAGE_URL_PROD;
  constructor(private http: HttpClient, private localStorageService : LocalStorageService) { }

  public createEvent(createEventRequest : CreateEventRequest) : Observable<HttpEvent<CreateEventResponse>>{
    let createEventFormRequest = new FormData();
    createEventFormRequest.append("userId", this.localStorageService.getUserId());
    createEventFormRequest.append("code", this.localStorageService.getGodModeCode());
    Object.entries(createEventRequest).forEach(([key, value], index) => {
      console.log(key, value, index);
      createEventFormRequest.append(key, value);
    }); 
    const url = this.baseUrl+"event";
    console.log("url ",url);
    return this.http.post<CreateEventResponse>(url,createEventFormRequest,{
      reportProgress: true,
      observe: "events"
    });
  }
  public addToEvent(memoryFileAndMetaUploadRequest : MemoryFileAndMetaUploadRequest) : Observable<HttpEvent<AddToEventResponse>>{
    let addToEventRequest = new FormData();
    addToEventRequest.append("userId", this.localStorageService.getUserId());
    addToEventRequest.append("code", this.localStorageService.getGodModeCode());
    
    Object.entries(memoryFileAndMetaUploadRequest).forEach(([key, value], index) => {
      console.log(key, value, index);
      addToEventRequest.append(key, value);
    });
    const url = this.baseUrl+"event";
    return this.http.put<AddToEventResponse>(url,addToEventRequest,{
      reportProgress: true,
      observe: "events"
    });
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
