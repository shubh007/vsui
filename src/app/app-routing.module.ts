import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { ViewEventsComponent } from './component/view-events/view-events.component';
import { UploadEventsComponent } from './component/upload-events/upload-events.component';
import { LoginComponent } from './component/login/login.component';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'upload', component : UploadEventsComponent},
  {path : 'view', component : ViewEventsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModuleimplements {}