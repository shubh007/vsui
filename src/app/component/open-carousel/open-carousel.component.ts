import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { VsDataSharingService } from 'src/app/service/vs-data-sharing.service';
import { ResourceType, ResourceAndDateDetail, ModelActions, ResourceDetail } from 'src/app/vsuiconst';
import * as uuid from 'uuid';

@Component({
  selector: 'app-open-carousel',
  templateUrl: './open-carousel.component.html',
  styleUrls: ['./open-carousel.component.css']
})
export class OpenCarouselComponent {
 
  @ViewChild('openCarouselModal') openCarouselModal: ElementRef | undefined
  @ViewChild('closeCarouseModal') closeCarouselModal: ElementRef | undefined
  @ViewChild('carouselContainer') carouselContainer: ElementRef | undefined
  
  firstName : string | undefined;
  dataBsTarget="#addToEvent";
  modalId="addToEvent";
  ariaLabelledby="addToEventLabel";
  dataBsToggle="dataBsToggle";

  seletedEventCarousel = { 
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
    this.vsDataSharingService.carouselModelObservable.subscribe(data => {
      this.gallaeryActions(data);
    });
  }
  getActiveStatus(index : number){
    if(index == 0){
      return 'active';
    }
    return '';
  }
  isCurrentActive(index : number){
    if(index == 0){
      return 'true';
    }
    return '';
  }
  getCarouselActiveStatus(index : number){
    if(index == 0){
      return 'carousel-item active';
    }
    return 'carousel-item';
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
      this.seletedEventCarousel = resourceAndDateDetail;
  }
  gallaeryActions(modelActions : ModelActions){
    if(modelActions == ModelActions.OPEN){
      if(this.openCarouselModal != undefined){
        this.openCarouselModal.nativeElement.click();
      }
    }else if(modelActions == ModelActions.CLOSE){
      if(this.closeCarouselModal != undefined){
        this.closeCarouselModal.nativeElement.click();
      }
    }
  }
  updateHeightAndWidth(resourceDetail : ResourceDetail){
     var heightLimit = this.carouselContainer?.nativeElement.offsetHeight;
     var widthLimit = this.carouselContainer?.nativeElement.offsetWidth;
     var unit = 'px';
     var minBoundry = Math.min(heightLimit,widthLimit);
     var viewWidth = '0px';
     var viewHeight = '0px';
     if(widthLimit < heightLimit){
       var aRatio =  resourceDetail.height / resourceDetail.width;
       viewWidth =  (minBoundry)+unit;
       viewHeight = 'auto';//(aRatio * minBoundry)+unit;
     }else {
       var aRatio =  resourceDetail.width / resourceDetail.height;
       viewWidth = 'auto';//(aRatio * minBoundry)+unit;
       viewHeight =  (minBoundry)+unit;
     }
     return {'height':viewHeight,'width':viewWidth};
   }
}
