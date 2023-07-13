import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  onClickSubmit(data: { password: string; }) {
    alert("Entered Email id : " + data.password);
 }

}
