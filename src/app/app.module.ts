import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ViewEventsComponent } from './component/view-events/view-events.component';
import { UploadEventsComponent } from './component/upload-events/upload-events.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModuleimplements } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ViewEventsComponent,
    UploadEventsComponent,
    LoginComponent
  ],
  imports: [
    AccordionModule.forRoot(),
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModuleimplements,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
