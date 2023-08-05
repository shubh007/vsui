import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map, catchError, throwError } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { VsDataSharingService } from 'src/app/service/vs-data-sharing.service';
import { MemoryFileAndMetaUploadRequest, ModelActions, ResourceDetail, ResourceDetailAddEvent, StatusResponseType } from 'src/app/vsuiconst';
import * as uuid from 'uuid';


@Component({
  selector: 'app-input-events',
  templateUrl: './input-events.component.html',
  styleUrls: ['./input-events.component.css']
})
export class InputEventsComponent {

  @ViewChild('openAddToEventModal') openAddToEventModal: ElementRef | undefined
  @ViewChild('closeAddToEventModal') closeAddToEventModal: ElementRef | undefined
  @Input() currentEventId = '';
  
  selectedFile : any;
  memoryFileAndMetaUploadRequest = {

  } as MemoryFileAndMetaUploadRequest;
  progress = 0;
  uploadInProgress = false;
  alertInProgress = false;
  statusMessage = '';
  statusMessageColor = 'alert-success';
  timeInMilliseconds = 2000;
  firstName : string | undefined;
  dataBsTarget="#addToEvent";
  modalId="addToEvent";
  ariaLabelledby="addToEventLabel";
  dataBsToggle="dataBsToggle";
  constructor(private vsDataSharingService : VsDataSharingService, private apiService : ApiService, private localStorageService : LocalStorageService, private router: Router) {
    this.vsDataSharingService.addToEventModelObservable.subscribe(data => {
      this.gallaeryActions(data);
    });
  }
    
  ngOnInit() {
    this.getFirstName();
    const myId = uuid.v4();
    this.dataBsTarget="#"+myId;
    this.modalId=myId;
    this.ariaLabelledby=myId+"Label";
    this.dataBsToggle=myId+"Toggle";
  }
  gallaeryActions(modelActions : ModelActions){
    if(modelActions == ModelActions.OPEN){
      if(this.openAddToEventModal != undefined){
        this.openAddToEventModal.nativeElement.click();
      }
    }else if(modelActions == ModelActions.CLOSE){
      if(this.closeAddToEventModal != undefined){
        this.closeAddToEventModal.nativeElement.click();
      }
    }
  }
  getFirstName(){
    let userName = this.localStorageService.getUsername();
    this.firstName = userName?.split(" ")[0];
  }

  onFileSelected(fileInput: any){
    const file:File = fileInput.target.files[0];
    if (file) {
      this.memoryFileAndMetaUploadRequest.eventFile = file;
      console.log(file.name);
    }
    var refTothis = this;
    const oFReader = new FileReader();
    oFReader.readAsDataURL(fileInput.target.files[0]);
    oFReader.onload = (event: any) => {
      var image = new Image();
      image.src = event.target.result;
      image.onload = function () {
        refTothis.memoryFileAndMetaUploadRequest.height = image.height;
        refTothis.memoryFileAndMetaUploadRequest.width = image.width;
        console.log(`width : ${image.width} px`, `height: ${image.height} px`);
      };
    };
  }
  addToEvent(ngForm : NgForm) {
    const eventId = this.currentEventId;
    this.uploadInProgress = true;
    this.alertInProgress = false;
    this.memoryFileAndMetaUploadRequest.eventId = eventId;
    this.apiService.addToEvent(this.memoryFileAndMetaUploadRequest).pipe(
      map((event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.progress = Math.round((100 / event.total) * event.loaded);
        } else if (event.type == HttpEventType.Response) {
          this.progress = 0;
          this.alertInProgress = true;
          this.uploadInProgress = false;
          if(event.body.statusResponse.statusType == StatusResponseType.SUCCESS){
            this.updateResourceDetails(event.body.resourceDetail,eventId);
            this.statusMessage = "Memory uploaded successfully!";
            this.statusMessageColor = 'alert-success';
            var refToThis = this;
            setTimeout(function(){
              refToThis.selectedFile = null;
              refToThis.alertInProgress = false;
              ngForm.resetForm();
              if(refToThis.closeAddToEventModal != undefined){
                refToThis.closeAddToEventModal.nativeElement.click();
              }
            }, this.timeInMilliseconds);
            
           }else{
            this.statusMessage = "Failed to upload memory";
            this.statusMessageColor = 'alert-danger';
            var refToThis = this;
            setTimeout(function(){
              refToThis.alertInProgress = false;
            }, this.timeInMilliseconds);
           }
        }
      }),
      catchError((err: any) => {
        this.progress = 0;
        this.selectedFile = null;
        ngForm.resetForm();
        this.uploadInProgress = false;
        this.statusMessage = "Failed to upload memory";
        this.statusMessageColor = 'alert-danger';
        var refToThis = this;
        setTimeout(function(){
          refToThis.alertInProgress = false;
        }, this.timeInMilliseconds);
        console.error('There was an error!', err.message);
        return throwError(() => new Error(err.message));
      })
    )
    .toPromise();
  }
  closeStatusAlert(){
    this.alertInProgress = false;
  }
  
  updateResourceDetails(resourceDetail: any, eventId: string) {
    var resourceDetailAddEvent ={
      eventId: eventId,
      resourceDetail: resourceDetail
    } as unknown as ResourceDetailAddEvent;
    this.vsDataSharingService.updateAddToEventData(resourceDetailAddEvent);
  }
}
