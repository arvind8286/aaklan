import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { ToggleService } from './toggle.service';
import { MatIcon,MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { CapitalizePipe } from "../../core/pipes/capitalize.pipe";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, MatMenuModule, MatIcon, MatIconModule, RouterLink, CapitalizePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  token:any;
  name:any;
  type:any;
  constructor(
    // private datePipe: DatePipe,
    private _rout:Router,
    private toggleService: ToggleService,){
      this.token=localStorage.getItem('accessToken');
      this.type=localStorage.getItem('type');

      if(this.token==null||this.type!='admin')
      {
        _rout.navigateByUrl('/login');
      }
      else
      {
        this.name=localStorage.getItem('username');
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
