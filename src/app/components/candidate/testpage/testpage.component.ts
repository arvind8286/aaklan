import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavigationStart, Route, Router } from '@angular/router';
import { isPlatformBrowser, Location, NgClass, NgForOf, NgIf } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionListService } from '../../../core/services/candidate/question-list.service';
import { QuestionSolveService } from '../../../core/services/candidate/question-solve.service';
import {
  APIResponse,
  queset,
  questionlist,
} from '../../../core/models/API.Models';
import { FormsModule } from '@angular/forms';
import { interval, Observable, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FinishTestService } from '../../../core/services/candidate/finish-test.service';
import Swal from 'sweetalert2';
import { ExamimageService } from '../../../core/services/candidate/examimage.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StatusFilterPipe } from "../../../core/pipes/status-filter.pipe";
import { CapitalizePipe } from "../../../core/pipes/capitalize.pipe";
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { GeolocationService } from '../../../core/services/candidate/geolocation.service';

@Component({
  selector: 'app-testpage',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    NgForOf,
    MatRadioModule,
    FormsModule,
    MatPaginatorModule,
    NgClass,
    NgIf,
    MatFormField,
    MatLabel, MatInputModule,
    StatusFilterPipe,
    CapitalizePipe,
    WebcamModule
],
  templateUrl: './testpage.component.html',
  styleUrl: './testpage.component.scss',
})
export class TestpageComponent implements OnInit, OnDestroy {

  //start capture camera code
  // @ViewChild('videoElement', { static: true })
  // videoElement!: ElementRef<HTMLVideoElement>;
  // @ViewChild('canvasElement', { static: true })
  // canvasElement!: ElementRef<HTMLCanvasElement>;

  // videoWidth = 640;
  // videoHeight = 480;
  seconds: number = 0;
  intervalId: any;
  randomNumber!: number;
  duration!: number;
  totaltime!: any;

  //exam declare variable
  counter!: number;
  minutes!: number;
  second!: number;
  answelabel!: any;
  hidenext: any;
  hideprv: any;
  currentquestion: number=0;
  testdata: questionlist[] = [];
  objquest: questionlist = new questionlist();
  questionfeatch=false;

//exam logic
constructor(
  private queslistserv: QuestionListService,
  private solveserve: QuestionSolveService,
  private finisherv: FinishTestService,
  private nav: Router,
  private examimgserv: ExamimageService,
  private locationserv:GeolocationService,
  @Inject(PLATFORM_ID) private platformId: Object,
  private auimgserv:ExamimageService

) {
  // this.duration=60;
  this.questionlistdata();
  this.getLocation();
}
// sweetalert toster setting
public toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

//sweetalert tostet setting end
submit_text:any;
qtype:any;
ngOnInit() {

  //this.startCamera();
  this.startTimer();
 // this.startTimer_capture();
 this.camera_bigin();
 this.questionlistdata();
  this.submit_text="Submit & Next >>";

}
ngOnDestroy() {
  this.clearTimer();
  this.stoptimer();
  clearInterval(this.captureInterval);
}
next() {
  this.qtype=null;
  this.conditions();
  if (this.currentquestion < this.testdata.length - 1) {
  this.submit_text="Submit & Next >>";
    this.hidenext = false;

    this.currentquestion++;

  } else {
    this.hidenext = true;

    this.submit_text="Submit";
  }
  if(this.currentquestion===this.testdata.length - 1)
    {
      this.submit_text="Submit";
    }

}


conditions()
{
  switch(this.testdata[this.currentquestion].question_type.toLowerCase())
  {
      case 'one_word':
        this.qtype='one_word';
        break;

        case 'true_false':
        this.qtype='true_false';
        break;

        case 'fill_in_the_blank':
        this.qtype='fill_in_the_blank';
        break;

        case 'mcq':
        this.qtype='mcq';
        break;

  }

}
selectedAnswer!: string;

previous() {
  this.qtype=null;

  this.conditions();

  if (this.currentquestion > 0) {
    // this.qtype=this.testdata[this.currentquestion].question_type.toLowerCase();
    this.disable = false;
    this.currentquestion--;
    // this.questionlistdata();

  } else {
    this.disable = true;
  }
}
// answer!:string;
objanswer: any;
record = false;
submit() {
  //this.chk=false;
  this.objanswer = {
    question_id: this.testdata[this.currentquestion].id,
    answer: this.testdata[this.currentquestion].answer,
    question_set_id: this.testdata[this.currentquestion].question_set_id,
  };

  //console.log(this.objanswer);
  this.solveserve
    .submitAnswer(this.objanswer)
    .subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        this.answelabel = true;
        console.log('answer sucessfully submited');
      } else {
        console.log('answer error');
      }
    });



  this.next();
}



finishtst: any;
finish() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to Finish the exam and submit the answer?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    showConfirmButton: true,
    // cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.objquest.question_set_id =
        this.testdata[this.currentquestion].question_set_id;

      this.finishtst = {
        question_set_id: this.objquest.question_set_id,
      };
      this.qid=this.objquest.question_set_id;
      console.log("question_set_id:"+this.objquest.question_set_id);
      this.getLocation();
      this.finisherv
        .examfinished(this.finishtst)
        .subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            //alert("exam submited"+this.finishtst);
            this.stoptimer();

            this.toast.fire('Exam Finished', res.message, 'success');

            this.nav.navigateByUrl('/finished');
          } else {
            this.stoptimer();
            this.toast.fire('Something wrong', res.message, 'error');
            //this.nav.navigateByUrl('/finished');
          }
        });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      //this.getallnoselement();
      this.toast.fire('Cancelled', 'No any changed', 'error');
    }
  });
}


questionlistdata() {
  this.queslistserv.getallQuestionLIST().subscribe((res: APIResponse) => {
    if (res.status == 'success') {

      this.testdata = res.data;
      this.counter=this.testdata[this.currentquestion].duration *60;
      //console.log()
      // this.counter=3600;
      this.qest = this.testdata[this.currentquestion].question_set_id;
      this.qtype=this.testdata[this.currentquestion].question_type.toLowerCase();
      if (this.testdata.length > 0) {

        this.record = false;
      } else {
        this.record = true;
      }
      this.questionfeatch=true;
    }
    else{
      this.questionfeatch=false;
    }
    // if(this.testdata!=null)
    //   {
    //     this.answelabel="text-bg-success mb-10 ms-5";
    //   }
    //   else
    //   {
    //     this.answelabel="text-soft-dark mb-10 ms-5";

    //   }

    // console.log(this.testdata[this.currentquestion].answer);
  });
}
disable = true;
// lotsOfTabs = new Array(30).fill(5).map((_, index) => `${index}`);


answerindex(ind: number) {
  this.currentquestion = ind;
}

//exam logic end
  startTimer() {
    const countdownTimer = interval(1000);
    this.totaltime = countdownTimer.subscribe(() => {
     //this.capture();
      if (this.counter == 0) {
        this.totaltime.unsubscribe();
        this.clearTimer();
        this.finish();
      }
      else
      {
        this.counter--;
        this.minutes = Math.floor(this.counter / 60);
        this.seconds = this.counter % 60;
      }

    }); // 1000 milliseconds = 1 second
  }
  // stream:any=null;
  // trigger:Subject<void>=new Subject();
  // previewimg:string='';
  // get $trigger():Observable<void>{
  //   return this.trigger.asObservable();
  // }
  // startCamera() {
  //   this.generateRandomNumber();

  //   navigator.mediaDevices.getUserMedia({
  //     video:{
  //       width:300,
  //       height:300
  //     }
  //   }).then((res)=>{
  //    // console.log("response",res);
  //    this.toast.fire('Alert','Something wrong','error')
  //     this.stream=res;

  //   }).catch(er=>{
  //     console.log(er);
  //     if(er?.message=='Permission denied')
  //     {
  //       // this.toast.fire('Error from Camera ', 'Please allow camera to aceess Permision', 'error');
  //       console.log("Please allow camera to aceess Permision")
  //     }
  //     else
  //     {
  //       console.log("Please Install camera in your System Please")

  //       // this.toast.fire('Error from Camera ', 'Please Install camera in your System Please', 'error');
  //     }
  //   })

  // }

  clearTimer() {
    if (this.totaltime) {
      clearInterval(this.totaltime);
    }
  }

  generateRandomNumber() {
    this.randomNumber = this.getRandomNumber(1000, 5000);
  }
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // imgdata: any;
  // snapshort(event:WebcamImage)
  // {
  //   console.log(event)
  //   this.previewimg=event.imageAsDataUrl;
  //   this.imgdata=event.imageAsBase64;
  // }
  examobj: any;
  qest: any;
  // capture() {
  //   // const context = this.canvasElement.nativeElement.getContext('2d');
  //   // const canvas = this.canvasElement.nativeElement;
  //   // const imageData = canvas.toDataURL('image/png');
  //   //console.log(imageData);

  //   this.examobj = {
  //     question_set_id: this.qest,
  //     image: imageData.toString(),
  //   };
  //   context?.drawImage(
  //     this.videoElement.nativeElement,
  //     0,
  //     0,
  //     this.videoWidth,
  //     this.videoHeight
  //   );
    // console.log(this.randomNumber);
  //   console.log(this.examobj);
  //   this.examimgserv
  //     .uploadexam_img(this.examobj)
  //     .subscribe((res: APIResponse) => {
  //       if (res.status == 'success') {
  //         console.log('image sent');
  //       } else {
  //         console.log('image sent error');
  //       }
  //     });
  // }

  // startTimer_capture() {
  //   this.intervalId = setInterval(() => {
  //    this.capture();
  //     this.seconds += 1;
  //   }, 5000); // 1000 milliseconds = 1 second
  // }

  stoptimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  //camera code end



  // second logic of background camera
  //end of

//location logic start
locationJs:any;
latitute:any;
longitute:any;
qid:any;
getLocation() {
  if (isPlatformBrowser(this.platformId)) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.locationJs = position.coords;
          this.latitute=this.locationJs.latitude;
          this.longitute=this.locationJs.longitude;
          console.log("latitite="+this.latitute+"----"+"Longitute="+this.longitute);
          this.sendlocation(this.locationJs.latitude,this.locationJs.longitude);
        },
        (error) => {
          console.log(error);

        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  } else {
    console.log("Navigator is not available on the server.");
  }
}
objlocation:any;
sendlocation(lati:string,longi:string)
{
  this.objlocation=
  {
    'question_set_id':this.qest,
    'latitude':lati.toString(),
    'longitude':longi.toString()
  }
  this.locationserv.addlocation(this.objlocation).subscribe((res:APIResponse)=>{
    if(res.status=='success')
    {
      console.log("location sent successfully:"+res.message);
    }
    else
    {
      console.log("location error"+res.message);

    }
  })

}

//location Logic end

//autocatpre image start logic

captureInterval: any;
stream:any=null;
trigger:Subject<void>=new Subject();
previewimg:string='';
//capture the image in background in every 15 min
autoCapturing(): void {
  // Capture an image every 15 minutes (15 * 60 * 1000 ms)
  this.captureInterval = setInterval(() => {
    this.capture_image();
  // }, 5000);
},15* 60 * 1000);
}


get $trigger():Observable<void>{
  return this.trigger.asObservable();
}
takeimage(event:WebcamImage)
{

  this.previewimg=event.imageAsDataUrl;
 // this.imgdata=event.imageAsBase64
}
camera_bigin() {
  navigator.mediaDevices.getUserMedia({
    video:{
      width:300,
      height:300
    }
  }).then((res)=>{

    this.stream=res;
    this.autoCapturing();

  }).catch(er=>{
    console.log(er);
    if(er?.message=='Permission denied')
    {

      // this.toast.fire('Error from Camera ', 'Please allow camera to aceess Permision', 'error');
      console.log("Please allow camera to aceess Permision")
    }
    else
    {
      // this.toast.fire('Error from Camera ', 'Please Install camera in your System Please', 'error');
      console.log("Please Install camera in your System Please");
    }
  })

}

exmobjimg:any;
videoWidth = 350;
videoHeight = 250;
//files: File[] = [];
imgdata: any;
// fileupload: any;
capture_image() {
   //this.startCamera();
  this.trigger.next();
  this.imgdata=this.previewimg;
  console.log("captured images:"+this.imgdata);
  //send image to API
this.exmobjimg={
  "question_set_id":this.qest,
  "image":this.imgdata
}
this.examimgserv.uploadexam_img(this.exmobjimg).subscribe((res:APIResponse)=>{
  if(res.status=='success')
  {
    console.log('image send success fully');
  }
  else
  {
    console.log('image not send ,somthing wrong');

  }
})

}

//autocatpre image end logic


}
