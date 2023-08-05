import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewEventsComponent } from './component/view-events/view-events.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModuleimplements } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InputEventsComponent } from './component/input-events/input-events.component';
import { AddEventComponent } from './component/add-event/add-event.component';
import { ShowEventComponent } from './component/show-event/show-event.component';
import { OpenGalleryComponent } from './component/open-gallery/open-gallery.component';

import { ImageCropperModule } from 'ngx-image-cropper';
import { OpenCarouselComponent } from './component/open-carousel/open-carousel.component';
@NgModule({
  declarations: [
    AppComponent,
    ViewEventsComponent,
    LoginComponent,
    InputEventsComponent,
    AddEventComponent,
    ShowEventComponent,
    OpenGalleryComponent,
    OpenCarouselComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModuleimplements,
    BrowserAnimationsModule,
    ImageCropperModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { 

  title = 'VS'

}
