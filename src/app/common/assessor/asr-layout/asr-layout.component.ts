import { Component } from '@angular/core';
import { AsrFooterComponent } from '../asr-footer/asr-footer.component';
import { AsrHeaderComponent } from '../asr-header/asr-header.component';
import { AsrSidebarComponent } from '../asr-sidebar/asr-sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { ToggleService } from '../../header/toggle.service';

@Component({
  selector: 'app-asr-layout',
  standalone: true,
  imports: [AsrFooterComponent,AsrHeaderComponent,AsrSidebarComponent,RouterOutlet,NgClass],

  templateUrl: './asr-layout.component.html',
  styleUrl: './asr-layout.component.scss'
})
export class AsrLayoutComponent {
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
