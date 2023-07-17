import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { AuthResponse, StatusResponseType } from 'src/app/vsuiconst';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  info = '';
  authResponse : AuthResponse | undefined;
  isLoadingDiabled = true;
  constructor(private apiService : ApiService, private localStorageService : LocalStorageService,private router: Router) {
    
  }

  onClickSubmit(ngForm : NgForm) {
    this.isLoadingDiabled = false;
    this.info = ngForm.value.password;
    this.apiService.isReadOnlyCodeValid(this.info).subscribe({
      next: data => {
       if(data.statusResponse.statusType == StatusResponseType.SUCCESS){
        this.localStorageService.storeUserDetails(this.info,data);
        this.isLoadingDiabled = true;
        this.router.navigate(['/']);
       }else{
        this.isLoadingDiabled = true;
        ngForm.resetForm();
        this.router.navigate(['/', 'login']);
       }
      },
      error: error => {
          this.isLoadingDiabled = true;
          ngForm.resetForm();
          this.router.navigate(['/','login']);
          console.error('There was an error!', error);
      }
    })
 }
 

}
