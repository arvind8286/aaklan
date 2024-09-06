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
import {
  APIResponse,
  batch,
  country,
  jobrole,
  manageassessor,
  nosdetails,
  noselement,
  pcdetails,
  sector,
  students,
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
// import { JobroleService } from '../../../core/services/jobrole.service';
// import { SectorService } from '../../../core/services/sector.service';

// import { ManageassessorService } from '../../../core/services/manageassessor.service';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { BatchService } from '../../../core/services/batch.service';
import { CandidateService } from '../../../core/services/candidate.service';
import { AdharNumberDirective } from '../../../core/directive/adhar-number.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MobileNumberDirective } from '../../../core/directive/mobile-number.directive';
import { Router } from '@angular/router';
import { StatusFilterPipe } from '../../../core/pipes/status-filter.pipe';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-candidate',
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
    AdharNumberDirective,
    MatTooltipModule,
    MobileNumberDirective,
    StatusFilterPipe,
    MatSidenavModule,
  ],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.scss',
})
export class CandidateComponent {
  flag = true;
  batchlist: any = [];
  countryList: country[] = [];
  objstudent: students = new students();
  studentlist: students[] = [];
  defaultDial: country = new country();

  obj: any;

  constructor(
    private batchserv: BatchService,
    private candidateserv: CandidateService,
    private countryserv: CountrydataService,
    private viewportScroller: ViewportScroller,
    private navurl: Router
  ) {
    // this.countryList[1].dial="+91";
    this.objstudent.mobile_code = '91';
    this.batchlistdisp();
    this.getcountryList();
   // this.getallcandidateList();
    this.objstudent.adhar_card = '';
  }

  // sweetalert toster setting
  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  currentvalue: any;
  detail = false;

  @ViewChild('drawer') drawer!: MatSidenav;

  openDrawer() {
    if (this.currentvalue != null) {
      this.objstudent.batch_id = '';
      this.objstudent.name = '';
      this.objstudent.middle_name = '';
      this.objstudent.surname = '';
      this.objstudent.father_name = '';
      this.objstudent.enrollment_number = '';
      this.objstudent.email = '';
      this.objstudent.mobile_code = '';
      this.objstudent.mobile_no = '';
      this.objstudent.adhar_card = '';
      this.objstudent.pan_card = '';
      this.objstudent.gender = '';
      this.flag = true;
      this.detail = false;
      this.dispflag = false;
    }

    this.drawer.open();
  }
  close() {
    this.drawer.close();
  }
  btchid:any;
  batchlistdisp()
  {
    this.batchserv.getAllBATCHList().subscribe((res:APIResponse)=>{
    this.batchlist=res.data;

    });
  }
  getcountryList() {
    this.countryserv.getAllcountryList().subscribe((res: APIResponse) => {
      this.countryList = res.data;
    });
  }

  oncreate() {
    this.obj = {
      batch_id: this.objstudent.batch_id,
      name: this.objstudent.name,
      middle_name: this.objstudent.middle_name,
      surname: this.objstudent.surname,
      father_name: this.objstudent.father_name,
      enrollment_number: this.objstudent.enrollment_number,
      email: this.objstudent.email,
      mobile_code: this.objstudent.mobile_code,
      mobile_no: this.objstudent.mobile_no,
      adhar_card: this.objstudent.adhar_card,
      pan_card: this.objstudent.pan_card,
      gender: this.objstudent.gender,
    };
    console.log(this.obj);
    this.candidateserv.addCANDIDATE(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add Candidate', res.message, 'success');
        this.getallcandidateList();
      } else {
        //alert(res.message);
        this.toast.fire('Error', res.message, 'error');
      }
    });
  }
  // objassesor: manageassessor=new manageassessor();
  dispflag: boolean = false;
  secotorList: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'status',
    'name',
    'enrollment_number',
    'batch_name',
    'username',
    'password',

    'email',
    'mobile_no',
    'adhar_card',
    'gender',
  ];
  datasource!: MatTableDataSource<students>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  getbatchlist() {
    // // debugger;
    // this.objstudent.batch_id=_id;
    // console.log(this.batchid);
    // this.objstudent.batch_id=objstudent.batch_id;
    //this.getallcandidateList();
  }
  batchid: any;
  objbtch: any;
  // pageopt: any = [5, 10, 25, 50, 100];
  currentPage: number = 1;
  pageSize: number = 10;
  onPageChange(page: number) {
    this.currentPage = page;
    this.getallcandidateList();
  }
  getallcandidateList() {
    // this.objbtch={batch_id:this.batchid};
    // if(this.objstudent.batch_id==null)
    // {
       //console.log("batch id="+this.batchlist[0])
    this.objbtch = {
      "batch_id": this.objstudent.batch_id,
      "perpage":10,
    "page":this.currentPage

      //  batch_id: this.objstudent.batch_id
    };

  // }
  // else
  // {
  //   this.objbtch = {
  //     batch_id: this.objstudent.batch_id,
  //     //  batch_id: this.objstudent.batch_id
  //   };
  // }
    this.candidateserv
      .getAllCndidate_pagewise(this.objbtch, this.currentPage, this.pageSize)
      .subscribe((res: APIResponse) => {
        //this.dispdata =res.data;
        this.datasource = new MatTableDataSource<students>(res.data);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        // this.jobroleList=res.data;
        //console.log(res);
      });
  }

  updid: any;
  update(upd: any) {
    this.dispflag = false;
    this.viewportScroller.scrollToPosition([0, 0]);
    // console.log(_cl);
    this.objstudent.batch_id = upd.batch_id;
    this.objstudent.name = upd.name;
    this.objstudent.middle_name = upd.middle_name;
    this.objstudent.surname = upd.surname;
    this.objstudent.father_name = upd.father_name;
    this.objstudent.enrollment_number = upd.enrollment_number;
    this.objstudent.email = upd.email;
    this.objstudent.mobile_code = upd.mobile_code;
    this.objstudent.mobile_no = upd.mobile_no;
    this.objstudent.adhar_card = upd.adhar_card;
    this.objstudent.pan_card = upd.pan_card;
    this.objstudent.gender = upd.gender;

    this.updid = upd.id;
    this.flag = false;
    this.dispflag = false;
    this.detail = false;
    this.currentvalue = upd;

    this.drawer.open();
  }
  upobj: any;
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
          batch_id: this.objstudent.batch_id,
          name: this.objstudent.name,
          middle_name: this.objstudent.middle_name,
          surname: this.objstudent.surname,
          father_name: this.objstudent.father_name,
          enrollment_number: this.objstudent.enrollment_number,
          email: this.objstudent.email,
          mobile_code: this.objstudent.mobile_code,
          mobile_no: this.objstudent.mobile_no,
          adhar_card: this.objstudent.adhar_card,
          pan_card: this.objstudent.pan_card,
          gender: this.objstudent.gender,
          id: this.updid,
        };

        console.log(this.upobj + 'update query');
        this.candidateserv
          .updateCANDIDATE(this.upobj)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Updated!', res.message, 'success');
              this.getallcandidateList();

              this.flag = true;
            } else {
              this.toast.fire('Error', res.message, 'error');
              this.flag = false;
            }
          });
        //alert("record updated");
        // this.flag = true;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.flag = false;
        this.toast.fire('Cancelled', 'update action is cancelled', 'error');
      }
    });
    //sweet alert end
  }
  dlt: any;
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

        this.dlt = { id: sid.id };
        // console.log(this.dlt);
        if (sid.status == 'Active') {
          this.candidateserv
            .activateCANDIDATE(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                // alert(res.message);
                this.toast.fire('Active', res.message, 'success');
                sid.status = 'Active';
                this.getallcandidateList();
              } else {
                // alert(res.message);
                this.toast.fire('Error', res.message, 'error');
              }
            });
        } else {
          this.candidateserv
            .deactivateCANDIDATE(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                //alert(res.message);
                this.toast.fire('Deactivated', res.message, 'success');
                sid.status = 'Deactivated';
                this.getallcandidateList();
              } else {
                this.toast.fire('Error', res.message, 'error');
              }
            });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getallcandidateList();

        this.toast.fire('Cancelled', 'No any changed', 'error');
      }
    });
  }
  //sweet alert end

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

        this.candidateserv
          .deleteCANDIDATE(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Deleted!', res.message, 'success');
              this.getallcandidateList();
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

  objdetail: any;
  detal: any;
  details(v: any) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.objdetail = {
      id: v.id,
    };
    this.candidateserv
      .detailsCANDIDATE(this.objdetail)
      .subscribe((res: APIResponse) => {
        this.detail = res.data;
        // console.log(this.detailsjobrol+"details of "+this.detailsjobrol.job_role_short_name);
        this.objstudent.batch_name = this.detal.batch_name;
        this.objstudent.name = this.detal.name;
        this.objstudent.middle_name = this.detal.middle_name;
        this.objstudent.surname = this.detal.surname;
        this.objstudent.father_name = this.detal.father_name;
        this.objstudent.enrollment_number = this.detal.enrollment_number;
        this.objstudent.email = this.detal.email;
        this.objstudent.mobile_code = this.detal.mobile_code;
        this.objstudent.mobile_no = this.detal.mobile_no;
        this.objstudent.adhar_card = this.detal.adhar_card;
        this.objstudent.pan_card = this.detal.pan_card;
        this.objstudent.gender = this.detal.gender;
        this.dispflag = true;
        this.flag = true;

      });
      this.detail = true;
    this.currentvalue = v;

    this.drawer.open();
  }

  bulkupload() {
    this.navurl.navigateByUrl('/bulkStudentUpload');
  }
}
