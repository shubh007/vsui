import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { VsDataSharingService } from 'src/app/service/vs-data-sharing.service';
import { ModelActions, ResourceAndDateDetail, ResourceType } from 'src/app/vsuiconst';
import * as uuid from 'uuid';

@Component({
  selector: 'app-open-gallery',
  templateUrl: './open-gallery.component.html',
  styleUrls: ['./open-gallery.component.css']
})
export class OpenGalleryComponent {
  
  @ViewChild('openGalleryModal') openGalleryModal: ElementRef | undefined
  @ViewChild('closeGalleryModal') closeGalleryModal: ElementRef | undefined
  
  firstName : string | undefined;
  dataBsTarget="#addToEvent";
  modalId="addToEvent";
  ariaLabelledby="addToEventLabel";
  dataBsToggle="dataBsToggle";

  seletedEventGallery = { 
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
  
  constructor(private localStorageService : LocalStorageService, private vsDataSharingService : VsDataSharingService) {
    this.vsDataSharingService.selectedEventObservable.subscribe(data => {
      this.updateSelectedEvent(data);
    });
    this.vsDataSharingService.galleryModelObservable.subscribe(data => {
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
  openAddToEvent(){
    this.vsDataSharingService.updateAddToEventModelData(ModelActions.OPEN);
  }
  getFirstName(){
    let userName = this.localStorageService.getUsername();
    this.firstName = userName?.split(" ")[0];
  }
  updateSelectedEvent(resourceAndDateDetail: ResourceAndDateDetail){
    if(resourceAndDateDetail === undefined 
      || resourceAndDateDetail.dateDetail === undefined 
      || resourceAndDateDetail.dateDetail.eventId === undefined
      || resourceAndDateDetail.dateDetail.eventId === ''){
        return;
      }
      this.seletedEventGallery = resourceAndDateDetail;
  }
  gallaeryActions(modelActions : ModelActions){
    if(modelActions == ModelActions.OPEN){
      if(this.openGalleryModal != undefined){
        this.openGalleryModal.nativeElement.click();
      }
    }else if(modelActions == ModelActions.CLOSE){
      if(this.closeGalleryModal != undefined){
        this.closeGalleryModal.nativeElement.click();
      }
    }
  }
  openInFullScreen(index : number){
  this.vsDataSharingService.updateCarouselModelData(ModelActions.OPEN);
  }
}
