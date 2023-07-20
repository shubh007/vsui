import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ResourceAndDateDetail, ResourceDetail, StatusResponseType } from 'src/app/vsuiconst';
import * as converter from "number-to-words";
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { NgForm } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css'],
})


export class ViewEventsComponent {
  title = 'vsui';
  isLoadingDiabled = true;
  firstName : string | undefined;
  accordionGroupStyle = 'accordionGroupStyle';
  isFirstOpen = true;
  currentEventId = '';
  selectedFile : any;
  progress = 0;
  uploadInProgress = false;
  @ViewChild('closeUploadModal') closeUploadModal: ElementRef | undefined
  // DatesWithResourceResponse
  dateAndResourceDeatailsResp : ResourceAndDateDetail[] | undefined;
 // constructor(private config: NgbCarouselConfig,private apiService : ApiService) {
  constructor(private apiService : ApiService, private localStorageService : LocalStorageService, private router: Router) {
  /*  config.interval = 10000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationIndicators = true;*/
  
  }
  log(event: boolean) {
    console.log(`Accordion has been ${event ? 'opened' : 'closed'}`);
  }
  ngOnInit() {
    console.log();
    this.isLoadingDiabled = false;
    this.apiService.getDatesAndResources().subscribe({
      next: data => {
        this.dateAndResourceDeatailsResp = data.resourceAndDateDetails;
        this.isLoadingDiabled = true;
      },
      error: error => {
        this.isLoadingDiabled = true;
          console.error('There was an error!', error);
      }
    })  
    this.getFirstName();
}
logout(){
  this.localStorageService.clearUserDetails();
  this.router.navigate(['/', 'login']);
}
getCollapseId(index : number,isId : boolean){
  let preFix = "flush-collapse";
  if(isId){
    preFix = "#flush-collapse";
  }
  const word = converter.toWords(index+1);
  return preFix+word.charAt(0).toUpperCase() + word.slice(1);
}
getFirstName(){
  let userName = this.localStorageService.getUsername();
  this.firstName = userName?.split(" ")[0];
}
updateCurrentEventId(newEventId : string){
  this.currentEventId = newEventId;
}
onFileSelected(event: any){
  const file:File = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    console.log(file.name);
  }
}
addToEvent(ngForm : NgForm) {
  const eventId = this.currentEventId;
  this.uploadInProgress = true;
  this.apiService.addToEvent(eventId,this.selectedFile as File).pipe(
    map((event: any) => {
      if (event.type == HttpEventType.UploadProgress) {
        this.progress = Math.round((100 / event.total) * event.loaded);
      } else if (event.type == HttpEventType.Response) {
        this.progress = 0;
        if(event.body.statusResponse.statusType == StatusResponseType.SUCCESS){
          this.updateResourceDetails(event.body.resourceDetail,eventId);
         }
         this.selectedFile = null;
         ngForm.resetForm();
         this.uploadInProgress = false;
         if(this.closeUploadModal != undefined){
          this.closeUploadModal.nativeElement.click();
         }
      }
    }),
    catchError((err: any) => {
      this.progress = 0;
      this.selectedFile = null;
      ngForm.resetForm();
      this.uploadInProgress = false;
      if(this.closeUploadModal != undefined){
        this.closeUploadModal.nativeElement.click();
       }
      console.error('There was an error!', err.message);
      return throwError(() => new Error(err.message));
    })
  )
  .toPromise();
}
createEvent(ngForm : NgForm){
  console.log(ngForm.value.eventDate);
  console.log(ngForm.value.eventMessage);
  this.apiService.createEvent(ngForm.value.eventDate,ngForm.value.eventMessage).subscribe({
    next: data => {
     if(data.statusResponse.statusType == StatusResponseType.SUCCESS){
      this.updateDateAndResourceDeatailsResp(data.resourceAndDateDetail);
     }
     this.isLoadingDiabled = true;
     console.error('status response', data.statusResponse);
    },
    error: error => {
      this.isLoadingDiabled = true;
        console.error('There was an error!', error);
    }
  })
}
updateResourceDetails(resourceDetail: ResourceDetail, eventId : string){
  if(this.dateAndResourceDeatailsResp != undefined){
    for(var resourceAndDateDetail of this.dateAndResourceDeatailsResp){
      if(resourceAndDateDetail.dateDetail.eventId === eventId){
        resourceAndDateDetail.resourceDetails.push(resourceDetail);
      }
    }
  }
}
updateDateAndResourceDeatailsResp(resourceAndDateDetail: ResourceAndDateDetail){
  if(this.dateAndResourceDeatailsResp === undefined){
    this.dateAndResourceDeatailsResp = [];
  }
  this.dateAndResourceDeatailsResp.push(resourceAndDateDetail);
}

}
