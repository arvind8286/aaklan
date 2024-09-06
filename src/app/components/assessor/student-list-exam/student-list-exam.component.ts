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
import { CommonModule, NgFor, NgIf, ViewportScroller } from '@angular/common';
import { CountrydataService } from '../../../core/services/countrydata.service';
import { APIResponse, country, examstdlist, jobrole, nosdetails, noselement, pcdetails, sector } from '../../../core/models/API.Models';
import {
  FormBuilder,
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
import { JobroleService } from '../../../core/services/jobrole.service';
import { SectorService } from '../../../core/services/sector.service';
import { NOS_DETAILSService } from '../../../core/services/nosdetails.service';
import { NoselementService } from '../../../core/services/noselement.service';
import { PcdetailService } from '../../../core/services/pcdetail.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExamstudentListService } from '../../../core/services/Assessor/examstudent-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-list-exam',
  standalone: true,
  // imports: [MatCardModule, MatButtonModule,MatIcon,MatTooltipModule,FormsModule,NgFor,CommonModule],
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
    NgFor,
    MatTooltipModule,

  ],
  templateUrl: './student-list-exam.component.html',
  styleUrl: './student-list-exam.component.scss'
})
export class StudentListExamComponent {



  sname:any;
  batchid:any;
  quest_id:any;
  constructor(
    private stdlistserv:ExamstudentListService,
    private route:ActivatedRoute,
    private routbk:Router


  )
  {
    this.sname=localStorage.getItem("username");
    this.quest_id=localStorage.getItem("questionid");

    this.batchid = this.route.snapshot.paramMap.get('id');
    console.log(this.batchid);

    this.getallstdexamlist();

  }
 // sweetalert toster setting
 public toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [

   'id',
    'status',
    'present',
    'batch_name',
   'name',
   'middle_name',
   'surname',
   'username',
   'password',
   'father_name',

   'enrollment_number',
   'email',
   'mobile_no',
   'adhar_card',
   'pan_card',
   'gender',


 ];
  datasource!: MatTableDataSource<examstdlist>;
  applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.datasource.filter = filterValue.trim().toLowerCase();
 }
 objbtch:any;
 objstdlist:examstdlist=new examstdlist();
getallstdexamlist()
{
  this.objbtch={
    "batch_id":this.batchid
  }

  this.stdlistserv.getexamStudentlist(this.objbtch).subscribe((res:APIResponse)=>{
    this.datasource=res.data;
   // this.objstdlist.id=res.data.id;
   // console.log(this.datasource);
  })
}
backtobatch() {
  this.routbk.navigateByUrl('/assessorPanel');
}
dlt:any;
statusfun(sid: any)
{
  //sweet alert start
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be Change the status!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    showConfirmButton: true,
    // cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      sid.present = sid.present == '1' ? '0' : '1';

      this.dlt = {
        "batch_id":this.batchid,
    "student_id":sid.id,
    "question_set_id":this.quest_id,
    "present":"1"
       };
     console.log(this.dlt);
      if (sid.present == '1') {
        this.stdlistserv
          .addattendance(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              // alert(res.message);
              this.toast.fire('Present', res.message, 'success');
              sid.present = '1';
              this.getallstdexamlist();
            } else {
              // alert(res.message);
              this.toast.fire('Error', res.message, 'error');
            }
          });
      } else {
        this.dlt = {
          "batch_id":this.batchid,
      "student_id":sid.id,
      "question_set_id":this.quest_id,
      "present":'0'
         };
        this.stdlistserv
          .addattendance(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Absent', res.message, 'success');
              sid.status ='0';
              this.getallstdexamlist();
            } else {
              this.toast.fire('Error', res.message, 'error');
            }
          });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      this.getallstdexamlist();

      this.toast.fire('Cancelled', 'No any changed', 'error');
    }
  });
}
  //sweet alert end
  vivad:any;
  vivalist(_id: any) {

localStorage.setItem("question_set_id",this.quest_id);
localStorage.setItem("batch_id",this.batchid);
// console.log(this.vivad);
this.routbk.navigateByUrl(`takeviva/${_id.id}`);
}



}
