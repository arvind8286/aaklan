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
import { APIResponse, country, jobrole, manageassessor, nosdetails, noselement, pcdetails, sector } from '../../../core/models/API.Models';
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

import { ManageassessorService } from '../../../core/services/manageassessor.service';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { DecimalNumberDirective } from '../../../core/directive/decimal-number.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MobileNumberDirective } from '../../../core/directive/mobile-number.directive';
import { StatusFilterPipe } from "../../../core/pipes/status-filter.pipe";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-manage-assessor',
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
    DecimalNumberDirective,
    MatTooltipModule,
    MobileNumberDirective,
    StatusFilterPipe,
    MatSidenavModule
],
  templateUrl: './manage-assessor.component.html',
  styleUrl: './manage-assessor.component.scss'
})
export class ManageAssessorComponent implements AfterViewInit, OnInit {
  hide = true;
  constructor(
    private _formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
   //  private schemeserv:SchemeService,
   private jobroleserv:JobroleService,
    private sectorse:SectorService,
   private assesorserv:ManageassessorService,
   private countryserv:CountrydataService
  ) {
    this.objassesor.assessment_mode="Online";
    this.getAllsector();
    this.getalljobrole();
    this.getallassessor();
    this.objassesor.mobile_code="91";
    this.getcountryList();


  }
  // sweetalert toster setting
public toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
 });

 //sweetalert tostet setting end
 currentvalue: any;
 detail = false;

 @ViewChild('drawer') drawer!: MatSidenav;

 openDrawer() {
   if (this.currentvalue != null) {
    this.objassesor.assessment_mode="";
    this.objassesor.sector_id="";
    this.objassesor.job_role_id="";
    this.objassesor.first_name ="";
    this.objassesor.middle_name="";
    this.objassesor.last_name="";
    this.objassesor.contact_no="";
    this.objassesor.email="";
    this.objassesor.sip_user_id="";
    this.objassesor.sip_user_password="";
    this.objassesor.technical_support=0;
    this.objassesor.payout_amount="";
    this.objassesor.address="";
    this.flag = true;
    this.detail = false;
    this.dispflag = false;
   }

   this.drawer.open();
 }
 close() {
   this.drawer.close();
 }


   ngOnInit(): void {

   }
   ngAfterViewInit() {
    // this.getAllScheme();
  }

  secotorList:sector[]=[];
  jobroleList:jobrole[]=[];
  objassesor:manageassessor=new manageassessor();
  techsport:boolean=false;
  flag=true;
  obj:any;
  dispflag=false;
  detailsjobrol:any;//assessor;//=new jobrole();
  upobj: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [

    'id',
    'index_id',
    'status',
    'technical_support',
   'assessment_mode',
   'sector_name',
   'job_role_name',
   'first_name',
   'login_username',
   'login_password',
   /*'address',
   'contact_no',
   'email',
   'payout_amount',
   'sip_user_id',
   'sip_user_password',*/
 ];
  datasource!: MatTableDataSource<manageassessor>;
  applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.datasource.filter = filterValue.trim().toLowerCase();
 }

 countryList:country[]=[];
 getcountryList()
 {
   this.countryserv.getAllcountryList().subscribe((res: APIResponse) => {
     this.countryList=res.data;

   });
 }
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
    this.objassesor.sector_id=this.secotorList[0].id;
    this.getalljobrole();
  }
  console.log(this.secotorList);
});
 }
 objjob:any;
 getalljobrole()
 {
  //
  this.objjob=
  {
    "perpage":10,
     "page":1,
     "assessment_mode":this.objassesor.assessment_mode,
    "sector_id":this.objassesor.sector_id
  }

  this.jobroleserv.getAllJOB_ROLE(this.objjob).subscribe((res: APIResponse) => {
    //this.dispdata =res.data;
    // this.datasource = new MatTableDataSource<nosdetails>(res.data);
    // this.datasource.paginator = this.paginator;
    // this.datasource.sort = this.sort;
    this.jobroleList=res.data;
    if (this.jobroleList.length === 1) {
      this.objassesor.job_role_id=this.jobroleList[0].id;
      //this.getalljobrole();
    }
    console.log("jobrole data"+this.jobroleList);
  });
 }
 //pageopt:any=[5,10,25,50,100];
 currentPage: number = 1;
 pageSize: number = 10;
 onPageChange(page: number) {
   this.currentPage = page;
   this.getallassessor();
 }
 getallassessor()
 {
  this.assesorserv.getAllAssessor_pagewise(this.currentPage, this.pageSize).subscribe((res: APIResponse) => {
    //this.dispdata =res.data;
    this.datasource = new MatTableDataSource<manageassessor>(res.data);
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
    // this.jobroleList=res.data;
  });
 }
 techfun(chk:any)
 {
   if(chk==true)
    {
      this.objassesor.technical_support="1";
    }
    else
    {
      this.objassesor.technical_support="0";

    }
 }
 oncreate()
 {
  this.obj=
  {
    "assessment_mode":this.objassesor.assessment_mode,
    "sector_id":this.objassesor.sector_id,
    "job_role_id":"default jobrole id remove",//this.objassesor.job_role_id,
    "first_name":this.objassesor.first_name,
    "middle_name":this.objassesor.middle_name, //optional
    "last_name":this.objassesor.last_name,
    "address":this.objassesor.address, //min-3 max-250
    "contact_no":this.objassesor.contact_no, //min-10 max-10
    "email":this.objassesor.email,
    "payout_amount": this.objassesor.payout_amount,
    "technical_support": this.objassesor.technical_support, //0=>No, 1=> Yes
    "sip_user_id": this.objassesor.sip_user_id, //min-6 max-16
    "sip_user_password": this.objassesor.sip_user_password //min-6 max-16
}


// console.log(this.obj);
    this.assesorserv.addASSESSOR(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add Assessor Details', res.message, 'success');
        this.getallassessor();
      } else {
        //alert(res.message);
        this.toast.fire('Error', res.message, 'error');
      }
    });

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
      sid.status = sid.status === 'Active' ? 'Deactivated' : 'Active';

      this.dlt = { id:sid.id };
     // console.log(this.dlt);
      if (sid.status == 'Active') {
        this.assesorserv
          .activateASSESSOR(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              // alert(res.message);
              this.toast.fire('Active', res.message, 'success');
              sid.status = 'Active';
              this.getallassessor();
            } else {
              // alert(res.message);
              this.toast.fire('Error', res.message, 'error');
            }
          });
      } else {
        this.assesorserv
          .deactivateASSESSOR(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Deactivated', res.message, 'success');
              sid.status ='Deactivated';
              this.getallassessor();
            } else {
              this.toast.fire('Error', res.message, 'error');
            }
          });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      this.getallassessor();
      this.toast.fire('Cancelled', 'No any changed', 'error');
    }
  });
  //sweet alert end

 }

 asrsid:any;
 objdetail:any;
update(upd:any)
{
  debugger
  this.dispflag=false;
  this.viewportScroller.scrollToPosition([0, 0]);
  // this.objdetail={
  //   "id":upd.id
  // }
  // this.assesorserv.detailsASSESSOR(this.objdetail).subscribe((res:APIResponse)=>{
  //   this.detailsjobrol=res.data;
    // console.log(this.detailsjobrol+"details of "+this.detailsjobrol.job_role_short_name);
  this.objassesor.assessment_mode=upd.assessment_mode;
  this.objassesor.sector_id=upd.sector_id;
  this.objassesor.job_role_id=upd.job_role_id;
  this.objassesor.first_name =upd.first_name;
  this.objassesor.middle_name=upd.middle_name;
  this.objassesor.last_name=upd.last_name;
  this.objassesor.address =upd.address;
  this.objassesor.mobile_code =upd.mobile_code;
  this.objassesor.contact_no=upd.contact_no;
  this.objassesor.email=upd.email;
  this.objassesor.payout_amount =upd.payout_amount;
  if(upd.technical_support=="1")
    {
      this.techsport=true;
      this.objassesor.technical_support="1";
    }
    else if(upd.technical_support=="0")
    {
      this.techsport=false;
      this.objassesor.technical_support="0";
    }
  this.objassesor.technical_support =upd.technical_support;
  this.objassesor.sip_user_id =upd.sip_user_id;
  this.objassesor.sip_user_password =upd.sip_user_password;
  this.asrsid=upd.id;



 // });
  this.flag=false;
  this.detail = false;
  this.currentvalue = upd;
  this.drawer.open();
}
onAmountChange(value: any) {
  this.objassesor.payout_amount = parseFloat(value).toFixed(2);
}
 onupdate()
 {

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

          "assessment_mode":this.objassesor.assessment_mode.toString(),
          "sector_id":this.objassesor.sector_id.toString(),
          "job_role_id":this.objassesor.job_role_id.toString(),
          "first_name":this.objassesor.first_name.toString(),
          "middle_name":this.objassesor.middle_name.toString(), //optional
          "last_name":this.objassesor.last_name.toString(),
          "address":this.objassesor.address.toString(), //min-3 max-250
          "contact_no":this.objassesor.contact_no.toString(), //min-10 max-10
          "email":this.objassesor.email.toString(),
          "payout_amount": this.objassesor.payout_amount.toString(),
          "technical_support": this.objassesor.technical_support.toString(), //0=>No, 1=> Yes
          "sip_user_id": this.objassesor.sip_user_id.toString(), //min-6 max-16
          "sip_user_password": this.objassesor.sip_user_password.toString(), //min-6 max-16
          // "mobile_code":this.objassesor.mobile_code,


          "id":this.asrsid.toString(),
           };

      console.log(this.upobj+"update query");
      this.assesorserv
        .updateASSESSOR(this.upobj)
        .subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            //alert(res.message);
            this.toast.fire('Record Updated!', res.message, 'success');
            this.getallassessor();

            this.techsport=false;

            // this.flag=true;

          } else {
            this.toast.fire('Error', res.message, 'error');
            this.flag = false;
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

details(v:any)
  {
    this.viewportScroller.scrollToPosition([0, 0]);
  // this.objdetail={
  //   id:v.id
  // }
  // this.assesorserv.detailsASSESSOR(this.objdetail).subscribe((res:APIResponse)=>{
  //   this.detailsjobrol=res.data;
    // console.log(this.detailsjobrol+"details of "+this.detailsjobrol.job_role_short_name);
  this.objassesor.assessment_mode=v.assessment_mode;
  this.objassesor.sector_id=v.sector_id;
  this.objassesor.job_role_id=v.job_role_id;
  this.objassesor.first_name =v.first_name;
  this.objassesor.middle_name=v.middle_name;
  this.objassesor.last_name=v.last_name;
  this.objassesor.address =v.address;
  this.objassesor.contact_no=v.contact_no;
  this.objassesor.email=v.email;
  this.objassesor.payout_amount =v.payout_amount;

  this.objassesor.technical_support =v.technical_support;
  this.objassesor.sip_user_id =v.sip_user_id;
  this.objassesor.sip_user_password =v.sip_user_password;
  this.objassesor.index_id =v.index_id;
  this.objassesor.login_username =v.login_username;
  this.objassesor.login_password =v.login_password;

  if(v.technical_support=="1")
    {
      this.techsport=true;
    }
    else if(v.technical_support=="0")
    {
      this.techsport=false;
    }

  this.dispflag=true;
  this.flag=false;

 // });
  this.detail = true;
  this.currentvalue = v;
  this.drawer.open();

 }

}
