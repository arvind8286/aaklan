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
import { NgFor, NgIf, ViewportScroller } from '@angular/common';
import { CountrydataService } from '../../../core/services/countrydata.service';
import { APIResponse, country, jobrole, sector } from '../../../core/models/API.Models';
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
import { SectorService } from '../../../core/services/sector.service';
import { JobroleService } from '../../../core/services/jobrole.service';
import { DecimalNumberDirective } from '../../../core/directive/decimal-number.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusFilterPipe } from '../../../core/pipes/status-filter.pipe';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-manage-jobrole',
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
    NgFor,
    DecimalNumberDirective,
    MatTooltipModule,
    StatusFilterPipe,
    MatSidenavModule

  ],
  templateUrl: './manage-jobrole.component.html',
  styleUrl: './manage-jobrole.component.scss'
})
export class ManageJobroleComponent  implements AfterViewInit, OnInit {

  constructor(
     private _formBuilder: FormBuilder,
     private viewportScroller: ViewportScroller,
    //  private schemeserv:SchemeService,
    private jobroleserv:JobroleService,
     private sectorse:SectorService
   ) {
    this.objjobrole.assessment_mode='Online';
     this.getAllsector();
     this.getalljobrole();
    //  this.objjobrole.job_role_name="kakaa";
      this.filterItems();
   }
// sweetalert toster setting
public toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

//sweetalert tostet setting end

currentvalue:any;
detail=false;

@ViewChild('drawer') drawer!: MatSidenav;

openDrawer() {


  if(this.currentvalue!=null)
  {

    this.objjobrole.assessment_mode="Online";
    this.objjobrole.sector_id="";
    this.objjobrole.job_role_name="";
    this.objjobrole.job_role_short_name ="";
    this.objjobrole.job_type="";
    this.objjobrole.qpc_code="";
    this.objjobrole.passing_percentage ="";
    this.objjobrole.nsqf_level="";
    this.objjobrole.total_marks="";
    this.objjobrole.total_easy_questions_count ="";
    this.objjobrole.total_medium_questions_count ="";
    this.objjobrole.total_difficult_questions_count ="";
    this.objjobrole.total_questions ="";
    this.objjobrole.total_viva_questions ="";
    this.objjobrole.core_nos_weightage="";
    this.objjobrole.non_core_nos_weightage="";
    this.objjobrole.version="";
    this.flag=true;
    this.detail=false;
    this.dispflag=false;
  }

  this.drawer.open();
}
close()
{
  this.drawer.close();
}


   ngOnInit(): void {

   }
   ngAfterViewInit() {
    // this.getAllScheme();
  }
   secotorList:sector[]=[];
   secotorListfilter:sector[]=[];
   objjobrole:jobrole=new jobrole();
   flag=true;
   obj:any;
   dispflag=false;
   detailsjobrol:any;//jobrole;//=new jobrole();
   upobj: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'status',
    'index_id',
    'assessment_mode',
    'sector_name',
    'job_role_name',
    'job_role_short_name',
    'job_type',
    'qpc_code',
    'passing_percentage',
    'nsqf_level',
    // 'total_marks',
    // 'total_easy_questions_count',
    // 'total_medium_questions_count',
    // 'total_difficult_questions_count',
    // 'total_questions',
    // 'total_viva_questions',
    'core_nos_weightage',
    'non_core_nos_weightage',


  ];

  datasource!: MatTableDataSource<jobrole>;

   //bind data in sector dropdown
   getAllsector()
   {
    //;
    this.sectorse.getAllSECTORList().subscribe((res: APIResponse) => {
      //this.dispdata =res.data;
      // this.datasource = new MatTableDataSource<scheme>(res.data);
      // this.datasource.paginator = this.paginator;
      // this.datasource.sort = this.sort;

      this.secotorList=res.data;
      if (this.secotorList.length === 1) {
        this.objjobrole.sector_id=this.secotorList[0].id;
        this.getalljobrole();
      }
      //console.log(this.secotorList);
    });
  }
//addfilter

filterItems()
{
  this.secotorListfilter= this.secotorList.filter(item=>item.status==='Active');

  console.log("filter data:"+this.secotorListfilter);
}

//filter end

  //add data of jobrole
  oncreate() {
    //  ;
    //  console.log(this.objcontry);
    this.obj = {

   "assessment_mode":this.objjobrole.assessment_mode,
  "sector_id":this.objjobrole.sector_id,
  "job_role_name": this.objjobrole.job_role_name, //2-200 char
  "job_role_short_name":"default",//this.objjobrole.job_role_short_name, //2-200 char
  "job_type": this.objjobrole.job_type,
  "qpc_code": this.objjobrole.qpc_code, //1-100 char
  "passing_percentage": this.objjobrole.passing_percentage, //0.1-100.22 //up to 3 digit and follow by three digit after points
  "nsqf_level": this.objjobrole.nsqf_level,
  "total_marks": this.objjobrole.total_marks,//0.1-100.22 //up to 3 digit and follow by three digit after points
  "total_easy_questions_count": this.objjobrole.total_easy_questions_count, // 0-9999
  "total_medium_questions_count": this.objjobrole.total_medium_questions_count, // 0-9999
  "total_difficult_questions_count": this.objjobrole.total_difficult_questions_count, // 0-9999
  "total_questions": this.objjobrole.total_questions, // 0-9999
  "total_viva_questions": this.objjobrole.total_viva_questions, // 0-9999
  "core_nos_weightage":" ",// this.objjobrole.core_nos_weightage,//0.1-999.22 //up to 3 digit and follow by three digit after points
  "non_core_nos_weightage":" ",// this.objjobrole.non_core_nos_weightage,
  "version":this.objjobrole.version
    };
    console.log(this.obj);
    this.jobroleserv.addJOB_ROLE(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add Jobrole', res.message, 'success');
        this.getalljobrole();
      } else {
        //alert(res.message);
        this.toast.fire('Error', res.message, 'error');
      }
    });
  }
//display data
currentPage: number = 1;
  pageSize: number = 10;
  onPageChange(page: number) {
    this.currentPage = page;
    this.getalljobrole();
  }

getalljobrole() {
  //;
  this.jobroleserv.getAllJob_role_pagewise(this.currentPage, this.pageSize).subscribe((res: APIResponse) => {
    //this.dispdata =res.data;
    this.datasource = new MatTableDataSource<jobrole>(res.data);
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;

    console.log(this.datasource);
  });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.datasource.filter = filterValue.trim().toLowerCase();
}

//status function start
statusfun(sid: any) {
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
      sid.status = sid.status === 'Active' ? 'Deactivated' : 'Active';

      this.dlt = { id:sid.id };
     // console.log(this.dlt);
      if (sid.status == 'Active') {
        this.jobroleserv
          .activateJOB_ROLE(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              // alert(res.message);
              this.toast.fire('Active', res.message, 'success');
              sid.status = 'Active';
              this.getalljobrole();
            } else {
              // alert(res.message);
              this.toast.fire('Error', res.message, 'error');
            }
          });
      } else {
        this.jobroleserv
          .deactivateJOB_ROLE(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Deactivated', res.message, 'success');
              sid.status ='Deactivated';
              this.getalljobrole();
            } else {
              this.toast.fire('Error', res.message, 'error');
            }
          });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      this.getalljobrole();

      this.toast.fire('Cancelled', 'No any changed', 'error');
    }
  });
  //sweet alert end
}

jobid!:string;
update(upd:jobrole)
{
  this.dispflag=false;
  this.viewportScroller.scrollToPosition([0, 0]);
  // console.log(_cl);
  this.objjobrole.assessment_mode=upd.assessment_mode;
  this.objjobrole.sector_id=upd.sector_id;
  this.objjobrole.job_role_name=upd.job_role_name;
  this.objjobrole.job_role_short_name =upd.job_role_short_name;
  this.objjobrole.job_type=upd.job_type;
  this.objjobrole.qpc_code=upd.qpc_code;
  this.objjobrole.passing_percentage =upd.passing_percentage;
  this.objjobrole.nsqf_level=upd.nsqf_level;
  this.objjobrole.total_marks=upd.total_marks;
  this.objjobrole.total_easy_questions_count =upd.total_easy_questions_count;
  this.objjobrole.total_medium_questions_count =upd.total_medium_questions_count;
  this.objjobrole.total_difficult_questions_count =upd.total_difficult_questions_count;
  this.objjobrole.total_questions =upd.total_questions;
  this.objjobrole.total_viva_questions =upd.total_viva_questions;
  this.objjobrole.core_nos_weightage=upd.core_nos_weightage;
  this.objjobrole.non_core_nos_weightage=upd.non_core_nos_weightage;
  this.objjobrole.version=upd.version;
  this.jobid=upd.id;
  this.flag = false;
  console.log(upd);
  this.currentvalue=upd;
    this.drawer.open();
    this.detail=false;
}

onupdate() {

  //sweet alert start
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do You want  update the data!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    showConfirmButton: true,
    // cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.upobj =
        {

          "assessment_mode":this.objjobrole.assessment_mode.toString(),
         "sector_id":this.objjobrole.sector_id.toString(),
         "job_role_name": this.objjobrole.job_role_name.toString(), //2-200 char
         "job_role_short_name": this.objjobrole.job_role_short_name.toString(), //2-200 char
         "job_type": this.objjobrole.job_type.toString(),
         "qpc_code": this.objjobrole.qpc_code.toString(), //1-100 char
         "passing_percentage": this.objjobrole.passing_percentage.toString(), //0.1-100.22 //up to 3 digit and follow by three digit after points
         "nsqf_level": this.objjobrole.nsqf_level.toString(),
        //  "total_marks": this.objjobrole.total_marks.toString(),//0.1-100.22 //up to 3 digit and follow by three digit after points
        //  "total_easy_questions_count": this.objjobrole.total_easy_questions_count.toString(), // 0-9999
        //  "total_medium_questions_count": this.objjobrole.total_medium_questions_count.toString(), // 0-9999
        //  "total_difficult_questions_count": this.objjobrole.total_difficult_questions_count.toString(), // 0-9999
        //  "total_questions": this.objjobrole.total_questions.toString(), // 0-9999
        //  "total_viva_questions": this.objjobrole.total_viva_questions.toString(), // 0-9999
         "core_nos_weightage": this.objjobrole.core_nos_weightage.toString(),//0.1-999.22 //up to 3 digit and follow by three digit after points
         "non_core_nos_weightage": this.objjobrole.non_core_nos_weightage.toString(),
         "version":this.objjobrole.version.toString(),
         "id":this.jobid.toString()
           };

      console.log(this.upobj+"update");

      this.jobroleserv
        .updateJOB_ROLE(this.upobj)
        .subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            //alert(res.message);
            this.toast.fire('Record Updated!', res.message, 'success');
            this.getalljobrole();

          // this.flag=true;

          } else {
            this.toast.fire('Error', res.message, 'error');
            // this.flag = false;
          }
        });
      //alert("record updated");
     // this.flag = true;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // this.flag = false;
      this.toast.fire('Cancelled', 'update action is cancelled', 'error');
    }
  });
  //sweet alert end
}
dlt:any;
deletefun(_id: any) {
  //sweet alert start
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do You want  Delete the data!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    showConfirmButton: true,
    // cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.dlt = { id:_id.id };
      console.log(this.dlt);
      this.jobroleserv
        .deleteJOB_ROLE(this.dlt)
        .subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            //alert(res.message);
            this.toast.fire('Record Deleted!', res.message, 'success');
            this.getalljobrole();
          } else {
            console.log(res.message);
            this.toast.fire('Error', res.message, 'error');
          }
        });
      //alert("record updated");
      this.flag = true;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      this.flag = false;
      this.toast.fire('Cancelled', 'Delete action is cancelled', 'error');
    }
  });
}
objdetail:any;
details(v:jobrole)
{

  this.viewportScroller.scrollToPosition([0, 0]);
  this.objdetail={
    id:v.id
  }
  this.jobroleserv.detailsJOB_ROLE(this.objdetail).subscribe((res:APIResponse)=>{
    this.detailsjobrol=res.data;
    // console.log(this.detailsjobrol+"details of "+this.detailsjobrol.job_role_short_name);
  this.objjobrole.assessment_mode=this.detailsjobrol.assessment_mode;
  this.objjobrole.sector_id=this.detailsjobrol.sector_id;
  this.objjobrole.job_role_name=this.detailsjobrol.job_role_name;
  this.objjobrole.job_role_short_name =this.detailsjobrol.job_role_short_name;
  this.objjobrole.job_type=this.detailsjobrol.job_type;
  this.objjobrole.qpc_code=this.detailsjobrol.qpc_code;
  this.objjobrole.passing_percentage =this.detailsjobrol.passing_percentage;
  this.objjobrole.nsqf_level=this.detailsjobrol.nsqf_level;
  this.objjobrole.total_marks=this.detailsjobrol.total_marks;
  this.objjobrole.total_easy_questions_count =this.detailsjobrol.total_easy_questions_count;
  this.objjobrole.total_medium_questions_count =this.detailsjobrol.total_medium_questions_count;
  this.objjobrole.total_difficult_questions_count =this.detailsjobrol.total_difficult_questions_count;
  this.objjobrole.total_questions =this.detailsjobrol.total_questions;
  this.objjobrole.total_viva_questions =this.detailsjobrol.total_viva_questions;
  this.objjobrole.core_nos_weightage=this.detailsjobrol.core_nos_weightage;
  this.objjobrole.non_core_nos_weightage=this.detailsjobrol.non_core_nos_weightage;
  this.objjobrole.version=this.detailsjobrol.version;
  this.objjobrole.index_id=this.detailsjobrol.index_id;

  this.dispflag=true;
  this.flag=true;
  this.currentvalue=v;
  this.detail=true;
  this.drawer.open();
  });

}

   }
