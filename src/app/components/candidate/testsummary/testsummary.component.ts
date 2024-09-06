import { Component, numberAttribute } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testsummary',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './testsummary.component.html',
  styleUrl: './testsummary.component.scss',
})
export class TestsummaryComponent {
  homepage() {
    this.routs.navigateByUrl('/pretest');
  }
  continue() {}

  sname: any;
  private history: string[] = [];
  constructor(
    private router: Router,
    private location: Location,
    private routs: Router
  ) {
    this.sname = localStorage.getItem('username');
    this.navigationsetting();
    this.timer=0;
    this.startTimer();
    this.inc=60;
  }

  // sweetalert toster setting
  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  //sweetalert tostet setting end

  navigationsetting() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          // Check if the navigation is a back action
          if (this.history.length > 1) {
            this.history.pop();
            if (this.shouldPreventBackNavigation()) {
              this.location.go(this.history[this.history.length - 1]);
            }
          } else {
            // Initial navigation, do not allow to go back
            this.history.push(this.location.path());
          }
        } else {
          // Normal navigation, push to history
          this.history.push(this.location.path());
        }
      }
    });
  }
  back!: boolean;
  shouldPreventBackNavigation(): boolean {
    //sweet alert start
    Swal.fire({
      title: 'Are you sure?',
      text: 'You cannot press back button or Do you want to cancel the exam!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      showConfirmButton: true,
      // cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.back = true;
      } else {
        this.back = false;
      }
    });
    return this.back;
  }

  capturedetails() {
    this.router.navigateByUrl('/capuredetails');
  }
  timer:any;
  inc: any;
  startTimer() {
    this.timer = setInterval(() => {
      //this.capture();

      this.inc--;
      if (this.inc == 0) {
        this.clearTimer();
        this.routs.navigateByUrl('/pretest');
      }
    }, 1000); // 1000 milliseconds = 1 second
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);

    }
  }
}
