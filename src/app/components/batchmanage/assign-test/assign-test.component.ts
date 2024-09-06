import { Component, OnInit, viewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe, NgFor, NgIf, ViewportScroller } from '@angular/common';
import { CountrydataService } from '../../../core/services/countrydata.service';
import { APIResponse, assigntest, assigntestmodel, batch, country, jobrole, manageassessor, queset, sector } from '../../../core/models/API.Models';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { JobroleService } from '../../../core/services/jobrole.service';
import { SectorService } from '../../../core/services/sector.service';
import { QuestService } from '../../../core/services/quest.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AssignservService } from '../../../core/services/assignserv.service';
import { ManageassessorService } from '../../../core/services/manageassessor.service';
import { BatchService } from '../../../core/services/batch.service';
import { CapitalizePipe } from "../../../core/pipes/capitalize.pipe";



@Component({
  selector: 'app-assign-test',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButton,
    MatPaginator,
    MatTableModule,
    FormsModule,
    NgIf,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSlideToggle,
    MatSortModule,
    MatFormFieldModule,
    MatIcon,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgFor,
    MatCheckboxModule,
    NgxMaterialTimepickerModule,
    CapitalizePipe,

],
providers: [DatePipe] ,
  templateUrl: './assign-test.component.html',
  styleUrl: './assign-test.component.scss'
})
export class AssignTestComponent implements OnInit {

  constructor(

    private questserv:QuestService,
    private route: ActivatedRoute,
    private routbk:Router,
    private assignserv:AssignservService,
    private assesorserv:ManageassessorService,
    private batchserv:BatchService,
    private datePipe:DatePipe


  ) {

    this.getbatchlist();
    this.getallquestset();
    this.getassesorlist();
    // this.showassignList();

  }
  btchid:any;
  ngOnInit(): void {
    this.objassigntst.assessment_mode='Online';
    this.btchid = this.route.snapshot.paramMap.get('id');
    if(this.btchid!=null)
    {
      this.objassigntst.batch_id=this.btchid;
      this.onupdate();
    }
  }
  fetchbatch:batch[]=[];
  getbatchlist()
  {
    this.batchserv.getAllBATCHList().subscribe((res:APIResponse)=>{
      this.fetchbatch=res.data;
    })
  }

  objassigntst:assigntest=new assigntest();
  questionsetlist:queset[]=[];
  batchlist:batch[]=[];
  assessorList:manageassessor[]=[];
  flag=true;
  cangivetst!:boolean;
  mandate!:boolean;
  dispflag=false;
  getallquestset()
  {
    this.questserv.getAllQUESSETList().subscribe((res:APIResponse)=>{
      this.questionsetlist=res.data;
    })
  }
  getassesorlist()
  {
    this.assesorserv.getAllASSESSORList().subscribe((res:APIResponse)=>{
      this.assessorList=res.data;
    })
  }
  assmode()
  {
    //console.log("theory is selected");

    if(this.objassigntst.assessment_type=="Theory")
      {
       // console.log("theory is selected");
        this.cangivetst=true;
      }else
      {
       // console.log("wrong");
        this.cangivetst=false;
      }
  }
  backtobatch() {
    this.routbk.navigateByUrl('/createbatch');
  }
  cangivechkbox(can:any)
  {


   if(can==true)
    {
      this.objassigntst.candidate_give="1";
    }
    else
    {
      this.objassigntst.candidate_give="0";


    }
  }
  mandateall(mnd:any)
  {
    if(mnd==true)
      {
        this.objassigntst.mandatory_answer="1";
      }
      else
      {
        this.objassigntst.mandatory_answer="0";


      }
  }
  // sweetalert toster setting
public toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
 });

 //sweetalert tostet setting end

//  formatDate(dateString: string): string {
//   const [year, month, day] = dateString.split('-');
//   const formattedDate = `20${year}-${month}-${day}`;
//   return formattedDate;
// }

formatDate(dateString: string): string | null {
  const formattedDate = this.datePipe.transform(dateString, 'yyyy-MM-dd');
  return formattedDate;
}
datetimesplit(dateString2: string) {

  const [date,time] = dateString2.split(' ');
  const sDate = date;
  const stime = time;
  //return formattedDate;
  // console.log("sDate="+sDate);
  // console.log("stime="+stime);
}
  obj:any;
  oncreate()
  {

    if(this.btchid==null)
    {
      this.btchid=this.objassigntst.batch_id;
    }
    //this.datetimesplit('2024-08-07 20:00:00');
    this.obj=
    {
      "question_set_id":this.objassigntst.question_set_id,
    "batch_id":this.btchid,
    "start_date":this.formatDate(this.objassigntst.start_date)+" "+this.objassigntst.start_time.toString(),
    "end_date":this.formatDate(this.objassigntst.end_date)+" "+this.objassigntst.end_time.toString(),

    "test_duration":this.objassigntst.test_duration, //in minutes
    "candidate_give":this.objassigntst.candidate_give, //0/1
    "mandatory_answer":this.objassigntst.mandatory_answer, //0/1
    "assessor_id":this.objassigntst.assessor_id
    }

    console.log("create start date"+this.obj.start_date);
    console.log("create end time"+this.obj.end_date);
    this.assignserv.assignTest(this.obj).subscribe((res:APIResponse)=>{
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Assign Test', res.message, 'success');
        // this.getallbatch();
      } else {
        //alert(res.message);
        this.toast.fire('Error', res.message, 'error');
      }
    })

  }
  onupdate()
  {
    // this.btchid=this.objassigntst.batch_id
    this.showassignList();
  }
  record=false;
  assigntestlist:any[]=[];
  objasign:any;
  showassignList()
  {
    this.objasign=
    {
      'batch_id':this.objassigntst.batch_id,
      "perpage":10,
    "page":1
    }
console.log(this.objasign);
    this.assignserv.getAllASSIGN_TEST_List(this.objasign).subscribe((res:APIResponse)=>{
      if(res.data.length>0)
      {
        this.assigntestlist=res.data;
        this.record=true;
      }
      else
    {
      this.record=false;
    }

    })
  }
}
