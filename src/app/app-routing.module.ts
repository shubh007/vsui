import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { ViewEventsComponent } from './component/view-events/view-events.component';
import { LoginComponent } from './component/login/login.component';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  {path : 'login', component : LoginComponent,canActivate: [AuthService]},
  {path : '', component : ViewEventsComponent,canActivate: [AuthService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModuleimplements {}