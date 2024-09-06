import { Component, HostListener } from '@angular/core';
import{MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import{MatFormField,MatLabel} from '@angular/material/form-field'
import{MatIcon} from '@angular/material/icon'
import{MatCheckbox} from '@angular/material/checkbox'
import{MatInput, MatInputModule}from '@angular/material/input'

import { FormsModule } from '@angular/forms';
import { APIResponse, stdlogin } from '../../core/models/API.Models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AssorLoginService } from '../../core/services/Assessor/assor-login.service';
import { AssorLogin } from '../../core/models/API.Models';


@Component({
  selector: 'app-assessor-login',
  standalone: true,
  imports: [FormsModule,MatSlideToggleModule,MatButtonModule,MatFormField,MatLabel,MatIcon,MatCheckbox,MatInputModule,MatInput],

  templateUrl: './assessor-login.component.html',
  styleUrl: './assessor-login.component.scss'
})
export class AssessorLoginComponent {


  hide = true;
  loginobj:AssorLogin= new AssorLogin();

  constructor(
   private  rout:Router,
    // private stdserv:StudentLoginService
    private asessorlogin:AssorLoginService
) {}

 // sweetalert toster setting
 public toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

//sweetalert tostet setting end
@HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    console.log('Enter key pressed!', event);
    // Your logic here
    this.onLogin();
  }

dataobj:any;
obj:any;
  onLogin()
  {
    this.obj=
    {
      "username":this.loginobj.username,
      "password":this.loginobj.password
    }
    console.log(this.obj);
    this.asessorlogin.AssessorLogin(this.obj).subscribe((res:APIResponse)=>{
      if(res.status=="success")
      {
        //alert("login success");
        this.toast.fire('Assessor Login success', res.message, 'success');
        // localStorage.setItem("logindata",JSON.stringify(res.data));
        this.dataobj=res.data;
        localStorage.setItem("accessToken",res.data.accessToken);
        localStorage.setItem('type',res.data.type);

        localStorage.setItem("username",this.dataobj.data.first_name+' '+this.dataobj.data.last_name);

        // console.log(this.dataobj.data.first_name+' '+this.dataobj.data.last_name);
        this.rout.navigateByUrl("/assessorPanel");
      }
      else
      {
       // alert("login failed");
       this.toast.fire('Login Failed ', res.message, 'error');
      }
    })
  }

}
