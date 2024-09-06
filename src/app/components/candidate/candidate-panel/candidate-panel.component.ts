import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavigationStart, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import Swal from 'sweetalert2';
import { InstructionService } from '../../../core/services/instruction.service';
import { InstructcandidateService } from '../../../core/services/candidate/instructcandidate.service';
import { APIResponse, instructions } from '../../../core/models/API.Models';
import { CapitalizePipe } from '../../../core/pipes/capitalize.pipe';

@Component({
  selector: 'app-candidate-panel',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CapitalizePipe,CommonModule],
  templateUrl: './candidate-panel.component.html',
  styleUrl: './candidate-panel.component.scss',
})
export class CandidatePanelComponent {

continue() {


}

  sname: any;
  private history: string[] = [];
  constructor(private router: Router, private location: Location,
    private instserv:InstructcandidateService
  ) {
    this.sname = localStorage.getItem('username');
    this.navigationsetting();
    this.instructioncand();

  }

  // sweetalert toster setting
  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });
   //sweetalert tostet setting end
  objinst:instructions=new instructions();
  instdata=false;

  instructioncand()
  {
    this.instserv.List_studinstruct().subscribe((res:APIResponse)=>{
      if(res.data.length>0)
      {
        this.objinst=res.data;
        this.instdata=true;
      }
      else
      {
        this.objinst=res.data;
        this.instdata=false;
       // this.objinst.instructions="<h3>Question instructions Not set</h3>";
      }




     // console.log(this.objinst);
    })
  }

  navigationsetting() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          // Check if the navigation is a back action
          if (this.history.length > 1) {
            this.history.pop();
            if (this.shouldPreventBackNavigation()) {
              this.location.go(this.history[this.history.length-1]);
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
  inst:any;
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

  capturedetails()
  {
    if(!this.objinst.finished_exam)
    {

      this.router.navigateByUrl('/capuredetails');
    }
    else
    {
      this.toast.fire('Alert','You have alredy Given the exam','error');
    }

  }
}
