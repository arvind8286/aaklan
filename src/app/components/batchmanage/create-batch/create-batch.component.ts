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
import {
  APIResponse,
  batch,
  country,
  jobrole,
  manageassessor,
  managetp,
  scheme,
  sector,
} from '../../../core/models/API.Models';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SchemeService } from '../../../core/services/scheme.service';
import { ManagetpService } from '../../../core/services/managetp.service';
import { ManageassessorService } from '../../../core/services/manageassessor.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BatchService } from '../../../core/services/batch.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, Router } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-create-batch',
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
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSidenavModule
  ],
  providers: [DatePipe] ,
  templateUrl: './create-batch.component.html',
  styleUrl: './create-batch.component.scss',
})
export class CreateBatchComponent {
  constructor(
    private viewportScroller: ViewportScroller,
    private sectorserv: SectorService,
    private schemeserv: SchemeService,
    private jobrolserv: JobroleService,
    private tpserve: ManagetpService,
    private assorserv: ManageassessorService,
    private batchserv: BatchService,
    private bthid: Router,
    private datePipe:DatePipe
  ) {
    this.objbatch.assessment_mode='Online';
    this.getAllassorlist();
    this.getalljobrole();
    this.getAllsecheme();
    this.getAllsector();
    this.getAlltplist();
    this.getallbatch();
  }

  secotorList: sector[] = [];
  schemeList: scheme[] = [];
  jobroleList: jobrole[] = [];
  tplist: managetp[] = [];
  assesorList: manageassessor[] = [];

  objbatch: batch = new batch();

  flag = true;
  obj: any;
  dispflag = false;
  detailsjobrol: any; //jobrole;//=new jobrole();
  upobj: any;
  objdetail: any;
  techsport: unknown;




  currentvalue: any;
  detail = false;

  @ViewChild('drawer') drawer!: MatSidenav;

  openDrawer() {
    if (this.currentvalue != null) {
      // this.objbatch.assessment_mode = 'Online';
            this.objbatch.sector_id = '';
            this.objbatch.job_role_id = '';
            this.objbatch.scheme_id = '';
            this.objbatch.batch_type = '';
            this.objbatch.assessment_type = '';
            this.objbatch.batch_name = '';
            this.objbatch.batch_no = '';
            this.objbatch.assessment_date = '';
            this.objbatch.assessment_duration = '';
            this.objbatch.assessment_end_time = '';
            // this.objbatch.assessment_mode = '';
            this.objbatch.assessment_start_time = '';
            this.objbatch.no_of_candidate = '';
            this.objbatch.assessor_id = '';
            this.objbatch.training_partner_id = '';
      this.flag = true;
      this.detail = false;
      this.dispflag = false;
    }

    this.drawer.open();
  }
  close() {
    this.drawer.close();
  }


  getAllsector() {
    this.sectorserv.getAllSECTORList().subscribe((res: APIResponse) => {
      this.secotorList = res.data;
      if(this.secotorList.length===1)
      {
        this.getalljobrole();
      }
    });
  }
  obsch:any;
  getAllsecheme() {
    this.obsch=
    {
      'sector_id':this.objbatch.sector_id

    }
    this.schemeserv.getAllSCHEME(this.obsch).subscribe((res: APIResponse) => {
      this.schemeList = res.data;
    });
  }
  objob:any;
 getalljobrole()
 {
  this.objob=
    {
      'sector_id':this.objbatch.sector_id
    }
    //;

  //;
  this.jobrolserv.getAllJOB_ROLE(this.objob).subscribe((res: APIResponse) => {
      this.jobroleList = res.data;
      if(this.jobroleList.length===1)
      {
        this.getAllassorlist();
      }
    });
  }
  getAlltplist() {
    this.tpserve.getAllTPList().subscribe((res: APIResponse) => {
      this.tplist = res.data;
    });
  }
  obasr:any;
  getAllassorlist() {
    this.obasr=
    {
      'sector_id':this.objbatch.sector_id,
      'job_role_id':this.objbatch.job_role_id,
      "perpage":100,
      "page":1
    }

    this.assorserv.getAllASSESSOR(this.obasr).subscribe((res: APIResponse) => {
      this.assesorList = res.data;
    });
  }
  // sweetalert toster setting
  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  //sweetalert tostet setting end

  techfun(chk: any) {
    if (chk == true) {
      this.objbatch.practical_shown = '1';
    } else {
      this.objbatch.practical_shown = '0';
    }
  }
  formatDate(dateString: string): string | null {
    const formattedDate = this.datePipe.transform(dateString, 'yyyy-MM-dd');
    return formattedDate;
  }
  oncreate() {
    this.obj = {
      sector_id: this.objbatch.sector_id,
      job_role_id: this.objbatch.job_role_id,
      batch_type: this.objbatch.batch_type, //Online, Offline
      scheme_id: this.objbatch.scheme_id,
      assessment_type: this.objbatch.assessment_type, //Theory & Viva, Separate Theory & Viva, Theory, Viva
      batch_name: this.objbatch.batch_name,
      batch_no: this.objbatch.batch_no,
      assessment_date: this.formatDate(this.objbatch.assessment_date),
      assessment_start_time: this.objbatch.assessment_start_time,
      assessment_end_time: this.objbatch.assessment_end_time,
      assessment_duration: this.objbatch.assessment_duration, //120 (in minutes)
      assessment_mode: this.objbatch.assessment_mode, //Online, Offline
      training_partner_id: this.objbatch.training_partner_id,
      assessor_id: this.objbatch.assessor_id,
      no_of_candidate: this.objbatch.no_of_candidate,
      practical_shown: this.objbatch.practical_shown, //0/1
    };

    console.log(this.obj);
    this.batchserv.addBATCH(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add Batch Details', res.message, 'success');
        this.getallbatch();
      } else {
        //alert(res.message);
        this.toast.fire('Error', res.message, 'error');
      }
    });
  }

  practical: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',

    'assessment_mode',
    'batch_name',
    'batch_type',
    'no_of_candidate',
    'sector_name',
    'job_role_name',
    'scheme_name',

    //  'status',
  ];
  datasource!: MatTableDataSource<batch>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  pageopt:any=[5,10,25,50,100];
 currentPage: number = 1;
 pageSize: number = this.pageopt;
 onPageChange(page: number) {
   this.currentPage = page;
   this.getallbatch();
 }

  getallbatch() {
    this.batchserv.getAllBatch_pagewise(this.currentPage, this.pageSize).subscribe((res: APIResponse) => {
      //this.dispdata =res.data;
      this.datasource = new MatTableDataSource<batch>(res.data);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.jobroleList = res.data;
    });
  }
  batchsid: any;
  update(upd: any) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.objdetail = {
      id: upd.id,
    };
    this.batchserv
      .detailsBATCH(this.objdetail)
      .subscribe((res: APIResponse) => {
        this.detailsjobrol = res.data;
        // console.log(this.detailsjobrol+"details of "+this.detailsjobrol.job_role_short_name);
        this.objbatch.assessment_mode =
          this.detailsjobrol.assessment_mode.toString();
        this.objbatch.sector_id = this.detailsjobrol.sector_id.toString();
        this.objbatch.job_role_id = this.detailsjobrol.job_role_id.toString();
        this.objbatch.scheme_id = this.detailsjobrol.scheme_id.toString();
        this.objbatch.batch_type = this.detailsjobrol.batch_type.toString();
        this.objbatch.assessment_type =
          this.detailsjobrol.assessment_type.toString();
        this.objbatch.batch_name = this.detailsjobrol.batch_name.toString();
        this.objbatch.batch_no = this.detailsjobrol.batch_no.toString();
        this.objbatch.assessment_date =
          this.detailsjobrol.assessment_date.toString();
        this.objbatch.assessment_duration =
          this.detailsjobrol.assessment_duration.toString();
        this.objbatch.assessment_end_time =
          this.detailsjobrol.assessment_end_time.toString();
        this.objbatch.assessment_mode =
          this.detailsjobrol.assessment_mode.toString();
        this.objbatch.assessment_start_time =
          this.detailsjobrol.assessment_start_time.toString();
        this.objbatch.no_of_candidate =
          this.detailsjobrol.no_of_candidate.toString();
        this.objbatch.assessor_id = this.detailsjobrol.assessor_id.toString();
        this.objbatch.training_partner_id =
          this.detailsjobrol.training_partner_id.toString();
        if (this.objbatch.practical_shown == '1') {
          this.techsport = true;
          this.objbatch.practical_shown = '1';
        } else if (this.objbatch.practical_shown == '0') {
          this.techsport = false;
          this.objbatch.practical_shown = '0';
        }

        this.batchsid = this.detailsjobrol.id.toString();
        this.flag = false;

      });
      this.dispflag = false;
      this.detail = false;
      this.currentvalue = upd;

      this.drawer.open();
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
        this.upobj = {
          sector_id: this.objbatch.sector_id.toString(),
          job_role_id: this.objbatch.job_role_id.toString(),
          batch_type: this.objbatch.batch_type.toString(), //Online, Offline
          scheme_id: this.objbatch.scheme_id.toString(),
          assessment_type: this.objbatch.assessment_type.toString(), //Theory & Viva, Separate Theory & Viva, Theory, Viva
          batch_name: this.objbatch.batch_name.toString(),
          batch_no: this.objbatch.batch_no.toString(),
          assessment_date: this.objbatch.assessment_date.toString(),
          assessment_start_time: this.objbatch.assessment_start_time.toString(),
          assessment_end_time: this.objbatch.assessment_end_time.toString(),
          assessment_duration: this.objbatch.assessment_duration.toString(), //120 (in minutes)
          assessment_mode: this.objbatch.assessment_mode.toString(), //Online, Offline
          training_partner_id: this.objbatch.training_partner_id.toString(),
          assessor_id: this.objbatch.assessor_id.toString(),
          no_of_candidate: this.objbatch.no_of_candidate.toString(),
          practical_shown: this.objbatch.practical_shown,
          id: this.batchsid.toString(),
        };

        console.log(this.upobj + 'update query');
        this.batchserv.updateBATCH(this.upobj).subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            //alert(res.message);
            this.toast.fire('Record Updated!', res.message, 'success');
            this.getallbatch();

            //  this.objbatch.practical_shown ="";

            // this.flag = true;
            this.techsport = false;
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

  details(v: any) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.objdetail = {
      id: v.id,
    };
    this.batchserv
      .detailsBATCH(this.objdetail)
      .subscribe((res: APIResponse) => {
        this.detailsjobrol = res.data;
        // console.log(this.detailsjobrol+"details of "+this.detailsjobrol.job_role_short_name);
        this.objbatch.assessment_mode = this.detailsjobrol.assessment_mode;
        this.objbatch.sector_name = this.detailsjobrol.sector_name;
        this.objbatch.job_role_name = this.detailsjobrol.job_role_name;
        this.objbatch.scheme_name = this.detailsjobrol.scheme_name;
        this.objbatch.batch_type = this.detailsjobrol.batch_type;
        this.objbatch.assessment_type = this.detailsjobrol.assessment_type;
        this.objbatch.batch_name = this.detailsjobrol.batch_name;
        this.objbatch.batch_no = this.detailsjobrol.batch_no;
        this.objbatch.assessor_email = this.detailsjobrol.assessor_email;
        this.objbatch.assessment_date = this.detailsjobrol.assessment_date;
        this.objbatch.assessor_mobile = this.detailsjobrol.assessor_mobile;
        this.objbatch.assessment_duration =
          this.detailsjobrol.assessment_duration;
        this.objbatch.assessment_end_time =
          this.detailsjobrol.assessment_end_time;
        this.objbatch.assessment_mode = this.detailsjobrol.assessment_mode;
        this.objbatch.assessment_start_time =
          this.detailsjobrol.assessment_start_time;
        this.objbatch.no_of_candidate = this.detailsjobrol.no_of_candidate;
        this.objbatch.assessor_name = this.detailsjobrol.assessor_name;
        this.objbatch.training_partner_name =
          this.detailsjobrol.training_partner_name;
        if (this.objbatch.practical_shown == '1') {
          this.techsport = true;
          this.objbatch.practical_shown = '1';
        } else if (this.objbatch.practical_shown == '0') {
          this.techsport = false;
          this.objbatch.practical_shown = '0';
        }

        this.dispflag = true;
        this.flag = true;
      });
      this.dispflag = false;
      this.detail = true;
      this.currentvalue = v;

      this.drawer.open();
  }
  dlt: any;
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
        this.dlt = { id: _id.id };

        this.batchserv.deleteBATCH(this.dlt).subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            //alert(res.message);
            this.toast.fire('Record Deleted!', res.message, 'success');
            this.getallbatch();
          } else {
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
  //bid:any;
  asigntest(id: any) {
    this.bthid.navigateByUrl(`assigntest/${id}`);
  }
}
