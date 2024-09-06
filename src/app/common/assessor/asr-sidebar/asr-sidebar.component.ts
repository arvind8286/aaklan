import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { ToggleService } from '../../header/toggle.service';

@Component({
  selector: 'app-asr-sidebar',
  standalone: true,
  imports: [NgClass,CdkAccordionModule,MatExpansionModule,RouterLinkActive,NgScrollbar,RouterLink],
  templateUrl: './asr-sidebar.component.html',
  styleUrl: './asr-sidebar.component.scss'
})
export class AsrSidebarComponent {
  panelOpenState = false;

  isToggled = false;

  constructor(
      private toggleService: ToggleService,
      //public themeService: CustomizerSettingsService
  ) {
      this.toggleService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }
  toggle() {
    this.toggleService.toggle();
}


}
