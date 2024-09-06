import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToggleService } from '../../header/toggle.service';

import { NgClass } from '@angular/common';
import { CandsidebarComponent } from '../candsidebar/candsidebar.component';
import { CandHeaderComponent } from '../cand-header/cand-header.component';
import { CandfooterComponent } from '../candfooter/candfooter.component';

@Component({
  selector: 'app-candlayout',
  standalone: true,
  imports: [CandsidebarComponent, CandHeaderComponent, CandfooterComponent,RouterOutlet,NgClass],
  templateUrl: './candlayout.component.html',
  styleUrl: './candlayout.component.scss'
})
export class CandlayoutComponent {
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
