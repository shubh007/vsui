import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import {  ResourceAndDateDetail, ResourceType } from 'src/app/vsuiconst';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent {
  
  @Input() resourceAndDateDetail!: ResourceAndDateDetail;

  constructor(private localStorageService : LocalStorageService, private router: Router) {
    
  }
    
  ngOnInit() {
    
  }

  getImageSource(){
    var url = '';
    if(this.resourceAndDateDetail.dateDetail.cardUrl != undefined || this.resourceAndDateDetail.dateDetail.cardUrl != null){
        url = this.resourceAndDateDetail.dateDetail.cardUrl ;
    }else{
      url = "../../../assets/images/ImageOne.png";
    }
    return {'background-image': 'url(' + url + ')'}
  }
}
