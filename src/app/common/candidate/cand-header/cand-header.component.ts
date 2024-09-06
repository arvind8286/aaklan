import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { ToggleService } from '../../header/toggle.service';
import { MatIcon,MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { CapitalizePipe } from "../../../core/pipes/capitalize.pipe";

@Component({
  selector: 'app-cand-header',
  standalone: true,
  imports: [NgClass, MatMenuModule, MatIcon, MatIconModule, RouterLink, CapitalizePipe],

  templateUrl: './cand-header.component.html',
  styleUrl: './cand-header.component.scss'
})
export class CandHeaderComponent {

  token:any;
  uname:any;
  type:any;
  constructor(
    // private datePipe: DatePipe,
    private _rout:Router,
    private toggleService: ToggleService,)
    {
      this.token=localStorage.getItem('accessToken');
      this.type=localStorage.getItem('type');
      if(this.token==null||this.type!='student')
      {
        _rout.navigateByUrl('/studentLogin');
      }
      else
      {
        this.uname=localStorage.getItem('username');
      }

    }
  currentDate: Date = new Date();
  //formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');
  formattedDate:any=this.currentDate.toDateString();
  isToggled = false;

  toggle() {
    this.toggleService.toggle();
}
// sweetalert toster setting
public toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

logout() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to Finish the Viva and submit the answer?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    showConfirmButton: true,
    // cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      this._rout.navigateByUrl('/slogout');

    }
    else
    {
        this.toast.fire('Alert','Cancel the Action','error');
    }
  });
}

}
