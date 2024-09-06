import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { ToggleService } from '../../header/toggle.service';
import { MatIcon,MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { CapitalizePipe } from "../../../core/pipes/capitalize.pipe";

@Component({
  selector: 'app-asr-header',
  standalone: true,
  imports: [NgClass, MatMenuModule, MatIcon, MatIconModule, RouterLink, CapitalizePipe],

  templateUrl: './asr-header.component.html',
  styleUrl: './asr-header.component.scss'
})
export class AsrHeaderComponent {
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
      if(this.token==null||this.type!='assessor')
      {
        _rout.navigateByUrl('/assessorlogin');
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

}
