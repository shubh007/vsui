import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ResourceAndDateDetail } from 'src/app/vsuiconst';
import { AccordionConfig } from 'ngx-bootstrap/accordion';

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
})


export class ViewEventsComponent {
  title = 'vsui';



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
    
    this.apiService.getDatesAndResources().subscribe(data => {
      this.dateAndResourceDeatailsResp = data.resourceAndDateDetails;
    })        
}
}
