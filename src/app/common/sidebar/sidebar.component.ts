import { Component } from '@angular/core';
import { ToggleService } from '../header/toggle.service';
import { NgClass } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLinkActive, RouterLinkWithHref,RouterLink} from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass,CdkAccordionModule,MatExpansionModule,RouterLinkActive,NgScrollbar,RouterLink],

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
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
