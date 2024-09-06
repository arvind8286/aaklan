import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { InstructcandidateService } from '../../../core/services/candidate/instructcandidate.service';
import { APIResponse } from '../../../core/models/API.Models';
import { CapitalizePipe } from "../../../core/pipes/capitalize.pipe";

@Component({
  selector: 'app-beforetest',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CapitalizePipe],
  templateUrl: './beforetest.component.html',
  styleUrl: './beforetest.component.scss'
})
export class BeforetestComponent {

  // sweetalert toster setting
  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  //sweetalert tostet setting end
  sname: any;

  private history: string[] = [];
  constructor(private router: Router, private location: Location,
    private instserv:InstructcandidateService
  ) {
    this.sname = localStorage.getItem('username');
    this.instructioncand();
  }

  taketest() {
    if(!this.testinst.finished_exam)
      {

        this.router.navigateByUrl('/teststart');
      }
      else
      {
        this.toast.fire('Alert','You have alredy Given the exam','error');
      }



}
testinst:any;
instructioncand()
{
  this.testinst=this.instserv.List_studinstruct().subscribe((res:APIResponse)=>{
    if(res.status=='success')
      {

        this.testinst=res.data;
        console.log(this.testinst);
        localStorage.setItem('duration',this.testinst.test_duration);
      }
      else
      {
        this.testinst.instructions="<h3>Question instructions Not set</h3>";
      }



  })
}



}
