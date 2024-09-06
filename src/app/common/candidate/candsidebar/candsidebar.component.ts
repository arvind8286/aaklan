import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { ToggleService } from '../../header/toggle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candsidebar',
  standalone: true,
  imports: [
    NgClass,
    CdkAccordionModule,
    MatExpansionModule,
    RouterLinkActive,
    NgScrollbar,
    RouterLink,
  ],
  templateUrl: './candsidebar.component.html',
  styleUrl: './candsidebar.component.scss',
})
export class CandsidebarComponent {
  panelOpenState = false;

  isToggled = false;

  constructor(
    private toggleService: ToggleService,
    private rout:Router
  ) //public themeService: CustomizerSettingsService
  {
    this.toggleService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }
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

  //sweetalert tostet setting end
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Finish the Exam and submit the answer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      showConfirmButton: true,
      // cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rout.navigateByUrl('/slogout');

      }
      else
      {
          this.toast.fire('Alert','Cancel the Action','error');
      }
    });
  }
}
