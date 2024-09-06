import { Component,HostListener } from '@angular/core';
import{MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import{MatFormField,MatLabel} from '@angular/material/form-field'
import{MatIcon} from '@angular/material/icon'
import{MatCheckbox} from '@angular/material/checkbox'
import{MatInput, MatInputModule}from '@angular/material/input'

import { FormsModule } from '@angular/forms';
import { APIResponse, Loginmodel } from '../../core/models/API.Models';
import { AdminService } from '../../core/services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,MatSlideToggleModule,MatButtonModule,MatFormField,MatLabel,MatIcon,MatCheckbox,MatInputModule,MatInput],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  loginobj:Loginmodel= new Loginmodel();

  constructor(
    private adminserve:AdminService,private  rout:Router
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
  onLogin()
  {
    this.adminserve.loginadmin(this.loginobj).subscribe((res:APIResponse)=>{
      if(res.status=="success")
      {
        //alert("login success");

        localStorage.setItem("logindata",JSON.stringify(res.data));
        localStorage.setItem("accessToken",res.data.accessToken);
        localStorage.setItem('username',res.data.name);
        localStorage.setItem('type',res.data.type);
        this.toast.fire('Login success', res.message, 'success');

        this.rout.navigateByUrl("/dashboard");
      }
      else
      {
       // alert("login failed");
       this.toast.fire('Login Failed ', res.message, 'error');
      }
    })
  }

  }

