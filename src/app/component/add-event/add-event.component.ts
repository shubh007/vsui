import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { CreateEventRequest, MediaFileDetails, ResourceAndDateDetail, StatusResponseType } from 'src/app/vsuiconst';
import { ImageCroppedEvent,LoadedImage, base64ToFile } from 'ngx-image-cropper';
import * as uuid from 'uuid';
import { HttpEventType } from '@angular/common/http';
import { map, catchError, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { VsDataSharingService } from 'src/app/service/vs-data-sharing.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  @ViewChild('textInputs') textInputs: ElementRef | undefined
  @ViewChild('chooseFileInput') chooseFileInput: ElementRef | undefined
  @ViewChild('closeUploadModal') closeUploadModal: ElementRef | undefined

  firstName : string | undefined;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  aspectRatiosLandscapeFractions = [[3 , 2], [4 , 3], [16 , 9], [1 , 1]];
  aspectRatiosPotraitFractions : any;
  aspectRatiosLandscapeDecimals : any;
  aspectRatiosPotraitDecimals: any;
  aspectRatiosAllDecimals= [0];
  toBeCropedInRatio = 0;
  previewWidth = 0+'em';
  previewHeight = 0+'em';
   mediaFileDetails = {
     
   } as MediaFileDetails;
  selectedCropImage : any;
  uploadInProgress = false;
  progress = 0;
  alertInProgress = false;
  statusMessage = '';
  statusMessageColor = 'alert-success';
  timeInMilliseconds = 2000;
  constructor(private vsDataSharingService : VsDataSharingService, private apiService : ApiService,
    private localStorageService : LocalStorageService, private router: Router, private sanitizer: DomSanitizer) {
    
  }
    
  ngOnInit() {
    this.getFirstName();
    this.updateRatios();
    this.updateHeightAndWidth();
  }
  getFirstName(){
    let userName = this.localStorageService.getUsername();
    this.firstName = userName?.split(" ")[0];
  }
  createEvent(ngForm : NgForm){
    this.uploadInProgress = true;
    this.alertInProgress = false;
    var createEventRequest = {
      message : ngForm.value.eventMessage,
      name : ngForm.value.eventName,
      date : ngForm.value.eventDate,
      eventCardPic : this.selectedCropImage
    } as CreateEventRequest;
    this.apiService.createEvent(createEventRequest).pipe(
      map((event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.progress = Math.round((100 / event.total) * event.loaded);
        } else if (event.type == HttpEventType.Response) {
          this.progress = 0;
          this.alertInProgress = true;
          this.uploadInProgress = false;
          if(event.body.statusResponse.statusType == StatusResponseType.SUCCESS){
            this.updateDateAndResourceDeatailsResp(event.body.resourceAndDateDetail);
            this.statusMessage = "Memory uploaded successfully!";
            this.statusMessageColor = 'alert-success';
            var refToThis = this;
            setTimeout(function(){
              refToThis.selectedCropImage = null;
              refToThis.alertInProgress = false;
              ngForm.resetForm();
              if(refToThis.closeUploadModal != undefined){
                refToThis.closeUploadModal.nativeElement.click();
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
        this.selectedCropImage = null;
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
  updateDateAndResourceDeatailsResp(resourceAndDateDetail: ResourceAndDateDetail){
    console.log(resourceAndDateDetail);
    this.vsDataSharingService.updateCreatedEventData(resourceAndDateDetail);
  }
  async imageCropped(event: ImageCroppedEvent) {
    console.log('imageCropped');
    var eventObjectUrl = ''
    if(event.objectUrl != undefined || event.objectUrl != null){
      eventObjectUrl = event.objectUrl;
    }
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(eventObjectUrl);
    let blob = await fetch(eventObjectUrl).then(r => r.blob());
    const myId = uuid.v4();
    this.selectedCropImage = new File([blob], myId+'.png', {
      type: blob.type,
    });
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
    console.log('imageLoaded');
}
  cropperReady() {
      // cropper ready
      console.log('cropperReady');
  }
  loadImageFailed() {
      // show message
      console.log('loadImageFailed');
  }
  updateRatios(){
    this.aspectRatiosLandscapeDecimals = [];
    this.aspectRatiosPotraitFractions = [];
    this.aspectRatiosPotraitDecimals = [];
    this.aspectRatiosAllDecimals = [];
    this.aspectRatiosLandscapeFractions.forEach( (element) => {
      this.aspectRatiosLandscapeDecimals.push(element[0]/element[1]);
      this.aspectRatiosAllDecimals.push(element[0]/element[1]);
      this.aspectRatiosPotraitFractions.push([element[1],element[0]]);
      this.aspectRatiosPotraitDecimals.push(element[1]/element[0]);
      this.aspectRatiosAllDecimals.push(element[1]/element[0]);
  });
  var index = 0;
  this.toBeCropedInRatio = this.aspectRatiosLandscapeDecimals[index];
  }
  updateCropRatio(aspectRatio : any){
    this.toBeCropedInRatio = aspectRatio;
  }
  onFileSelected(fileInput: any){
    this.imageChangedEvent = fileInput;
    const file:File = fileInput.target.files[0];
    if (file) {
      this.mediaFileDetails.eventFile = file;
      console.log(file.name);
      console.log(file);
    }
    var refTothis = this;
    const oFReader = new FileReader();
    oFReader.readAsDataURL(fileInput.target.files[0]);
    console.log(fileInput.target.files[0]);
    oFReader.onload = (event: any) => {
      var image = new Image();
      image.src = event.target.result;
      image.onload = function () {
        refTothis.mediaFileDetails.height = image.height;
        refTothis.mediaFileDetails.width = image.width;
        refTothis.updateHeightAndWidth();
      };
    };
  }
  closeStatusAlert(){
    this.alertInProgress = false;
  }
  updateHeightAndWidth(){
   this.mediaFileDetails.eventFile;
    var heightLimit = this.textInputs?.nativeElement.offsetHeight-(this.chooseFileInput?.nativeElement.offsetHeight);
    var widthLimit = this.chooseFileInput?.nativeElement.offsetWidth;
    var unit = 'px';
    var minBoundry = Math.min(heightLimit,widthLimit);
    if(widthLimit < heightLimit){
      var aRatio =  this.mediaFileDetails.height / this.mediaFileDetails.width;
      this.previewWidth =  (minBoundry)+unit;
      this.previewHeight = 'auto';//(aRatio * minBoundry)+unit;
    }else {
      var aRatio =  this.mediaFileDetails.width / this.mediaFileDetails.height;
      this.previewWidth = 'auto';//(aRatio * minBoundry)+unit;
      this.previewHeight =  (minBoundry)+unit;
    }
  }

}
