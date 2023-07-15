import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { ViewEventsComponent } from './component/view-events/view-events.component';
import { UploadEventsComponent } from './component/upload-events/upload-events.component';
import { LoginComponent } from './component/login/login.component';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  {path : '', component : LoginComponent,canActivate: [AuthService]},
  //{path : 'login', component : LoginComponent,canActivate: [AuthService]},
  {path : 'upload', component : UploadEventsComponent,canActivate: [AuthService]},
  {path : 'view', component : ViewEventsComponent,canActivate: [AuthService]} ,
 // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModuleimplements {}