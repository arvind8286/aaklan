import { Component, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AssorExamListService } from '../../../core/services/Assessor/assor-exam-list.service';
import { APIResponse } from '../../../core/models/API.Models';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { CapitalizePipe } from '../../../core/pipes/capitalize.pipe';



@Component({
  selector: 'app-assessorpanel',
  standalone: true,

    imports: [MatCardModule, MatButtonModule,MatMenuModule,MatIcon,MatTooltipModule,FormsModule,NgFor,CommonModule,CapitalizePipe],

  templateUrl: './assessorpanel.component.html',
  styleUrl: './assessorpanel.component.scss'
})
export class AssessorpanelComponent {

sname: any;


constructor(
  private examlistserv:AssorExamListService,
  private bthid:Router
)
{
  this.sname=localStorage.getItem("username");
  this.examlist();


}
examlistobj:any[]=[];
record=false;
examlist()
{
  this.examlistserv.getexamlist().subscribe((res:APIResponse)=>{
    this.examlistobj=res.data;
    if(this.examlistobj.length>0)
    {
       this.record=false;
    }
    else
    {
      this.record=true;
    }


    // console.log(this.examlistobj);
  })
}
candlist(bid:any,qid:any) {
  localStorage.setItem("questionid",qid);
  // console.log(bid);
  // console.log(qid);
  this.bthid.navigateByUrl(`stdexamlist/${bid}`);



  }

}
