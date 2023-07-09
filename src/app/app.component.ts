import { Component } from '@angular/core';
import { NgbCarouselConfig, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './api.service';
import { DateAndResourceDeatails, ResourceAndDateDetail, VsUiConstants } from './vsuiconst';
//import { VsUiConstants } from "./vsuiconst.ts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbCarouselConfig, NgbAccordionModule]
})
//http://localhost:9100/vs/confessionOfLove/images/PHOTO-2022-11-13-17-12-04.jpg
export class AppComponent {
  title = 'vsui';
  dateAndResourceDeatailsResp : ResourceAndDateDetail[] | undefined;
  constructor(private config: NgbCarouselConfig,private apiService : ApiService) {
    config.interval = 10000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationIndicators = true;
  }
  ngOnInit() {
    this.apiService.getDatesAndResources().subscribe(data => {
      this.dateAndResourceDeatailsResp = data.resourceAndDateDetails;
    })        
}
}
