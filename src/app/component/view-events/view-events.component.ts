import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ModelActions, ResourceAndDateDetail, ResourceDetail, ResourceType, StatusResponseType } from 'src/app/vsuiconst';
import * as converter from "number-to-words";
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { NgForm } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { VsDataSharingService } from 'src/app/service/vs-data-sharing.service';
import { ShowEventComponent } from '../show-event/show-event.component';
import { AddEventComponent } from '../add-event/add-event.component';
import { OpenGalleryComponent } from '../open-gallery/open-gallery.component';
import { InputEventsComponent } from '../input-events/input-events.component';
@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css'],

})

export class ViewEventsComponent  implements AfterViewInit, OnInit {
  title = 'vsui';
  isLoadingDiabled = true;
  firstName : string | undefined;
  accordionGroupStyle = 'accordionGroupStyle';
  isFirstOpen = true;
  seletedEvent = { 
    dateDetail: {
      date: '',
      name: '',
      message: '',
      cardUrl:'',
      eventId: '',
    },
    order: 0,
    resourceDetails: [{
      url: '',
      hashFile: '',
      resourceType: ResourceType.IMAGE,
      height: 0,
      width: 0,
    }],
  } as ResourceAndDateDetail;

  
  dateAndResourceDeatailsResp : ResourceAndDateDetail[] | undefined;
 
  constructor( private vsDataSharingService : VsDataSharingService, private apiService : ApiService, private localStorageService : LocalStorageService, private router: Router) {
  
    this.vsDataSharingService.createdEventObservable.subscribe(data => {
      console.log(" data createdEventObservable ",data);
      this.updateDateAndResourceDeatailsResp(data);
    });
    this.vsDataSharingService.addToEventObservable.subscribe(data => {
      console.log(" data addToEventObservable ",data);
      this.updateResourceDetails(data.resourceDetail,data.eventId);
    });
    
  }
  ngAfterViewInit(): void {
    console.log(" ngAfterViewInit ");
    
  }
  log(event: boolean) {
    console.log(`Accordion has been ${event ? 'opened' : 'closed'}`);
  }
  ngOnInit() {
    console.log(" ngOnInit ");
    
    this.isLoadingDiabled = false;
    this.apiService.getDatesAndResources().subscribe({
      next: data => {
        this.dateAndResourceDeatailsResp = data.resourceAndDateDetails;
        if(this.dateAndResourceDeatailsResp.length > 0){
          this.seletedEvent = this.dateAndResourceDeatailsResp[0];
          this.vsDataSharingService.updateSelectedEventData(this.seletedEvent);
        }
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
selectEvent(resourceAndDateDetail: ResourceAndDateDetail){
  this.seletedEvent = resourceAndDateDetail;
  this.vsDataSharingService.updateSelectedEventData(this.seletedEvent);
  this.vsDataSharingService.updateGalleryModelData(ModelActions.OPEN);
}
goToHome(){
  this.router.navigate(['']);
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

updateResourceDetails(resourceDetail: ResourceDetail, eventId : string){
  if(eventId === undefined || eventId === ''){
    return;
  }
  if(this.dateAndResourceDeatailsResp != undefined){
    console.log("this.seletedEvent Going to publish resourceDetail", resourceDetail);
    console.log("this.seletedEvent Going to publish eventId", eventId);
    console.log("this.seletedEvent Going to publish dateAndResourceDeatailsResp", this.dateAndResourceDeatailsResp);
    for(var resourceAndDateDetail of this.dateAndResourceDeatailsResp){
      if(resourceAndDateDetail.dateDetail.eventId === eventId){
        resourceAndDateDetail.resourceDetails.push(resourceDetail);
        this.seletedEvent = resourceAndDateDetail;
        
        console.log("this.seletedEvent Going to publish", this.seletedEvent);
        this.vsDataSharingService.updateSelectedEventData(this.seletedEvent);
      }
    }
  }
}

updateDateAndResourceDeatailsResp(resourceAndDateDetail: ResourceAndDateDetail){
  if(resourceAndDateDetail === undefined 
    || resourceAndDateDetail.dateDetail === undefined 
    || resourceAndDateDetail.dateDetail.eventId === undefined
    || resourceAndDateDetail.dateDetail.eventId === ''){
      return;
    }
  if(this.dateAndResourceDeatailsResp === undefined){
    this.dateAndResourceDeatailsResp = [];
  }
  this.dateAndResourceDeatailsResp.push(resourceAndDateDetail);
}

}
