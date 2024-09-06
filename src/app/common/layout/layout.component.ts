import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { ToggleService } from '../header/toggle.service';
import { MatSidenavModule,MatSidenav } from '@angular/material/sidenav';
import { NgScrollbarModule } from 'ngx-scrollbar';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FooterComponent,RouterOutlet,NgClass,MatSidenavModule,NgScrollbarModule,MatSidenav],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  title = 'AAKLAN';

  isToggled = false;

  constructor(
      public router: Router,
      private toggleService: ToggleService,

  )
   {
      this.toggleService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }

}
