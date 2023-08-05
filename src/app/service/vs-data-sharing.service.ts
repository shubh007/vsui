import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModelActions, ResourceAndDateDetail, ResourceDetail, ResourceDetailAddEvent, ResourceType } from '../vsuiconst';

@Injectable({
  providedIn: 'root'
})
export class VsDataSharingService {

  private resourceAndDateDetail ={ 
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
  private resourceDetailAddEvent ={
    eventId: '',
    resourceDetail: {
      url: '',
      hashFile: '',
      resourceType: ResourceType.IMAGE,
      height: 0,
      width: 0,
    } as ResourceDetail
  } as unknown as ResourceDetailAddEvent;
  

  private selectedEventSubject = new BehaviorSubject(this.resourceAndDateDetail);
  public selectedEventObservable = this.selectedEventSubject.asObservable();

  private createdEventSubject = new BehaviorSubject(this.resourceAndDateDetail);
  public createdEventObservable = this.createdEventSubject.asObservable();

  private addToEventSubject = new BehaviorSubject(this.resourceDetailAddEvent);
  public addToEventObservable = this.addToEventSubject.asObservable();

  private galleryModelSubject = new BehaviorSubject(ModelActions.NO_ACTION);
  public galleryModelObservable = this.galleryModelSubject.asObservable();

  private addToEventModelSubject = new BehaviorSubject(ModelActions.NO_ACTION);
  public addToEventModelObservable = this.addToEventModelSubject.asObservable();

  private carouselModelSubject = new BehaviorSubject(ModelActions.NO_ACTION);
  public carouselModelObservable = this.carouselModelSubject.asObservable();

  constructor() { }

  updateSelectedEventData(value: any) {
    this.selectedEventSubject.next(value);
  }

  updateCreatedEventData(value: any) {
    this.createdEventSubject.next(value);
  }

  updateAddToEventData(value: any) {
    this.addToEventSubject.next(value);
  }

  updateGalleryModelData(value: any) {
    this.galleryModelSubject.next(value);
  }
  updateAddToEventModelData(value: any) {
    this.addToEventModelSubject.next(value);
  }
  updateCarouselModelData(value: any) {
    this.carouselModelSubject.next(value);
  }
 
}
