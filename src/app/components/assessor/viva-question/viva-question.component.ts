import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, NavigationStart, Route, Router } from '@angular/router';
import { Location, NgClass, NgForOf, NgIf } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionListService } from '../../../core/services/candidate/question-list.service';
import { QuestionSolveService } from '../../../core/services/candidate/question-solve.service';
import { APIResponse, queset, questionlist, Vivaquestion } from '../../../core/models/API.Models';
import { FormsModule } from '@angular/forms';
import { interval } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FinishTestService } from '../../../core/services/candidate/finish-test.service';
import Swal from 'sweetalert2';
import { ExamimageService } from '../../../core/services/candidate/examimage.service';
import { VivaQuestionListService } from '../../../core/services/Assessor/viva-question-list.service';
import { VivaFinishService } from '../../../core/services/Assessor/viva-finish.service';
import { VivaSubmitService } from '../../../core/services/Assessor/viva-submit.service';

@Component({
  selector: 'app-viva-question',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatTabsModule,NgForOf,MatRadioModule,FormsModule,MatPaginatorModule,NgClass,NgIf],

  templateUrl: './viva-question.component.html',
  styleUrl: './viva-question.component.scss'
})
export class VivaQuestionComponent {

  viva:any;
  batchid:any;
  qset_id:any;
  sid:any;
  hidenext:any;
hideprv:any;
currentquestion!:number;
vivadata:Vivaquestion[]=[];
objquest:Vivaquestion=new Vivaquestion();
  constructor(
    private getdata:ActivatedRoute,
    private queslistserv:VivaQuestionListService,

    private solveserve:VivaSubmitService,
    private finisherv:VivaFinishService,
    private nav:Router,
    private examimgserv:ExamimageService
  )
  {
   // this.counter=720;
  this.currentquestion=0;
  this.questionlistdata();
  // this.startTimer();
  // this.startTimer_capture();
  // this.generateRandomNumber();
  //this.paginatedQuestions=this.testdata;
  this.hidenext=false;
  this.hideprv=false;
    this.sid=this.getdata.snapshot.paramMap.get('sid');
    this.batchid=localStorage.getItem('batch_id');
    this.qset_id=localStorage.getItem('question_set_id');

    // console.log(this.batchid+"batch");
    // console.log(this.sid+"sid");
    // console.log(this.qset_id+"quest");
    this.questionlistdata();
    this.currentquestion=0;
  }
// sweetalert toster setting
public toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
 });

 //sweetalert tostet setting end
  //back to student list
backtostdlist() {
this.nav.navigateByUrl('assessorPanel');
}
questionfeatch=false;
questionlistdata()
{
this.viva={
  "batch_id":this.batchid,
    "question_set_id":this.qset_id
}
// console.log(this.viva+"-viva");
  this.queslistserv.getVivaQuestionList(this.viva).subscribe((res:APIResponse)=>{
    if (res.status == 'success') {
      if(res.data.length>0)
      {

        this.questionfeatch=true;
      }

      this.vivadata=res.data;
    // if(this.vivadata==null)
    // {
    //   //this.toast.fire('Alert','Viava question Not uploaded','error')
    // }

      }
      else{
        this.questionfeatch=false;
      }
  })

}

answerindex(ind:number)
{
  this.currentquestion=ind;
}
finishtst:any;

finish() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to Finish the Viva and submit the answer?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    showConfirmButton: true,
    // cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
  this.objquest.question_set_id=this.vivadata[this.currentquestion].question_set_id;

this.finishtst={
  "question_set_id":this.objquest.question_set_id,
  "student_id":this.sid,
  "batch_id":this.batchid,

};
//console.log(this.objquest.question_set_id);
this.finisherv.Viva_EXAM_FINISH(this.finishtst).subscribe((res:APIResponse)=>{

  if(res.status=="success")
    {
      //alert("exam submited"+this.finishtst);
      //this.stoptimer();
      this.toast.fire('Viva Exam Finished', res.message, 'success');

      this.nav.navigateByUrl('/assessorPanel');

    }
    else
    {
     // this.stoptimer();
      this.toast.fire('Something wrong', res.message, 'error');
      this.nav.navigateByUrl('/assessorPanel');

    }
})


} else if (result.dismiss === Swal.DismissReason.cancel) {
  //this.getallnoselement();
  this.toast.fire('Cancelled', 'No any changed', 'error');
}
});


  }
  objanswer:any;
  answelabel!:any;
  submit() {
    this.objanswer={
      "question_id":this.vivadata[this.currentquestion].id,
      "answer":this.vivadata[this.currentquestion].answer,
      "question_set_id":this.vivadata[this.currentquestion].question_set_id
    }

    //console.log(this.objanswer);
    this.solveserve.SubmitVivaQuestionSolve(this.objanswer).subscribe((res:APIResponse)=>{
      if(res.status=='success')
        {
          this.answelabel=true;
          console.log('answer sucessfully submited');

        }
        else
        {
          console.log('answer error');

        }
    })
    this.next();

  }
  disable=false;
  next() {
    if(this.currentquestion<this.vivadata.length-1)
      {

        this.hidenext=false;
      this.currentquestion++;

      }
      else
      {
        this.hidenext=true;

      }
  }
  previous() {
    if(this.currentquestion>0)
      {
        this.disable=false;
        this.currentquestion--;
      }
      else
      {
        this.disable=true;
      }
  }

}
