import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ResourceAndDateDetail } from 'src/app/vsuiconst';
import * as converter from "number-to-words";

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css'],
})


export class ViewEventsComponent {
  title = 'vsui';
  isLoadingDiabled = true;

  accordionGroupStyle = 'accordionGroupStyle';
  isFirstOpen = true;

  dateAndResourceDeatailsResp : ResourceAndDateDetail[] | undefined;
 // constructor(private config: NgbCarouselConfig,private apiService : ApiService) {
  constructor(private apiService : ApiService) {
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
}

getCollapseId(index : number,isId : boolean){
  let preFix = "flush-collapse";
  if(isId){
    preFix = "#flush-collapse";
  }
  const word = converter.toWords(index+1);
  return preFix+word.charAt(0).toUpperCase() + word.slice(1);
}

}
