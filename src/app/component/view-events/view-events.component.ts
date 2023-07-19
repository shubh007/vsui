import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ResourceAndDateDetail, ResourceDetail, StatusResponseType } from 'src/app/vsuiconst';
import * as converter from "number-to-words";
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { NgForm } from '@angular/forms';

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
addToEvent() {
  this.isLoadingDiabled = false;
  const eventId = this.currentEventId;
  this.apiService.addToEvent(eventId,this.selectedFile as File).subscribe({
    next: data => {
     if(data.statusResponse.statusType == StatusResponseType.SUCCESS){
      this.updateResourceDetails(data.resourceDetail,eventId);
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
