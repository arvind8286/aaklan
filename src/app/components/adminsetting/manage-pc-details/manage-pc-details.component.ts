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
import { APIResponse, country, jobrole, nosdetails, noselement, pcdetails, sector } from '../../../core/models/API.Models';
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
import { DecimalNumberDirective } from '../../../core/directive/decimal-number.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusFilterPipe } from "../../../core/pipes/status-filter.pipe";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-manage-pc-details',
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
  templateUrl: './manage-pc-details.component.html',
  styleUrl: './manage-pc-details.component.scss'
})
export class ManagePcDetailsComponent implements AfterViewInit, OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
   //  private schemeserv:SchemeService,
   private jobroleserv:JobroleService,
    private sectorse:SectorService,
    private nosserv:NOS_DETAILSService,
    private noselemserv:NoselementService,
    private pcserv:PcdetailService
  ) {
    this.objpc.assessment_mode='Online';

    this.getAllsector();
    this.getalljobrole();
    this.getallnosdetails();
    this.getallnoselement();
    this.getallPCDetails();
   //  this.objjobrole.job_role_name="kakaa";

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

      this.objpc.assessment_mode="Online";
      this.objpc.sector_id="";
      this.objpc.job_role_id="";
      this.objpc.nos_id ="";
      this.objpc.nos_element_name="";
      this.objpc.pc_name="";
      this.objpc.nos_code="";

      this.objpc.pc_description="";
      this.objpc.total_theory_questions="";
      this.objpc.total_viva_questions="";
      this.objpc.total_theory="";
      this.objpc.total_viva="";
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
  jobroleList:jobrole[]=[];
  // objjobrole:jobrole=new jobrole();
  noslist:nosdetails[]=[];
  noselmlist:noselement[]=[];
  objpc:pcdetails=new pcdetails();

  flag=true;
  obj:any;
  dispflag=false;
  detailsjobrol:any;//jobrole;//=new jobrole();
  upobj: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'index_id',
    'status',
    'pc_name',
  //  'pc_description',
   'nos_code',
   'nos_element_name',
   'total_theory_marks',
   'total_viva_marks',
   'total_theory_questions',
   'total_viva_questions',




 ];
  datasource!: MatTableDataSource<pcdetails>;
  applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.datasource.filter = filterValue.trim().toLowerCase();
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
  if(this.secotorList.length===1)
  {
    this.getalljobrole();
  }
  console.log(this.secotorList);
});
 }
 objob:any;
 getalljobrole()
 {
  this.objob=
    {
      'sector_id':this.objpc.sector_id
    }
    //;

  //;
  this.jobroleserv.getAllJOB_ROLE(this.objob).subscribe((res: APIResponse) => {
    //this.dispdata =res.data;
    // this.datasource = new MatTableDataSource<nosdetails>(res.data);
    // this.datasource.paginator = this.paginator;
    // this.datasource.sort = this.sort;
    this.jobroleList=res.data;
    if(this.jobroleList.length===1)
    {
      this.getallnosdetails();
    }
    console.log(this.datasource);
  });
 }
 objnos:any;
  getallnosdetails() {
    this.objnos=
    {
      'job_role_id':this.objpc.job_role_id,
      'sector_id':this.objpc.sector_id
    }
    //;
    this.nosserv.getAllNOS_DETAILS(this.objnos).subscribe((res: APIResponse) => {
    //this.dispdata =res.data;
    // this.datasource = new MatTableDataSource<nosdetails>(res.data);
    // this.datasource.paginator = this.paginator;
    // this.datasource.sort = this.sort;
    this.noslist=res.data;
    if(this.noslist.length===1)
    {
      this.getallnoselement();
    }

    console.log(this.datasource);
  });

 }
 objnoselm:any;
 getallnoselement() {
  this.objnoselm=
  {
    'nos_id':this.objpc.nos_id,
    'job_role_id':this.objpc.job_role_id,
      'sector_id':this.objpc.sector_id
  }
  //;
  this.noselemserv.getAllNOS_ELEMETNS(this.objnoselm).subscribe((res: APIResponse) => {
    //this.dispdata =res.data;
    // this.datasource = new MatTableDataSource<noselement>(res.data);
    // this.datasource.paginator = this.paginator;
    // this.datasource.sort = this.sort;
    this.noselmlist=res.data;
    if(this.noselmlist.length===1)
    {
      this.objpc.nos_element_id=this.noselmlist[0].id;
    }

    console.log(this.datasource);
  });
}
currentPage: number = 1;
  pageSize: number = 10;
  onPageChange(page: number) {
    this.currentPage = page;
    this.getallPCDetails();
  }
getallPCDetails()
{
  this.pcserv.getAllPC_pagewise(this.currentPage, this.pageSize).subscribe((res: APIResponse) => {
    //this.dispdata =res.data;
    this.datasource = new MatTableDataSource<pcdetails>(res.data);
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;

    console.log(this.datasource);
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
          this.pcserv
            .activatePCDETAILS(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                // alert(res.message);
                this.toast.fire('Active', res.message, 'success');
                sid.status = 'Active';
                this.getallPCDetails();
              } else {
                // alert(res.message);
                this.toast.fire('Error', res.message, 'error');
              }
            });
        } else {
          this.pcserv
            .deactivatePCDETAILS(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                //alert(res.message);
                this.toast.fire('Deactivated', res.message, 'success');
                sid.status ='Deactivated';
                this.getallPCDetails();
              } else {
                this.toast.fire('Error', res.message, 'error');
              }
            });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getallPCDetails();

        this.toast.fire('Cancelled', 'No any changed', 'error');
      }
    });
    //sweet alert end
}
pcid:any;
obpc:any;
pcupd:any;
update(upd:any)
{
  this.dispflag=false;
  this.viewportScroller.scrollToPosition([0, 0]);
  this.obpc=
  {
    "id":upd.id
  }
  this.pcserv.detailsPCDETAILS(this.obpc).subscribe((res:APIResponse)=>{
  // console.log(_cl);
  this.pcupd=res.data;
  this.objpc.assessment_mode=this.pcupd.assessment_mode;
  this.objpc.sector_id=this.pcupd.sector_id;
  this.objpc.job_role_id=this.pcupd.job_role_id;
  this.objpc.nos_id =this.pcupd.nos_id;
  this.objpc.nos_element_id=this.pcupd.nos_element_id;
  this.objpc.pc_name=this.pcupd.pc_name;
  this.objpc.pc_description=this.pcupd.pc_description;
  this.objpc.total_theory=this.pcupd.total_theory_marks;
  this.objpc.total_viva=this.pcupd.total_viva_marks;
  this.objpc.total_viva_questions=this.pcupd.total_viva_questions;
  this.objpc.total_theory_questions=this.pcupd.total_theory_questions;

  this.pcid=this.pcupd.id;
})
  this.flag = false;
  this.currentvalue=upd;
    this.drawer.open();
    this.detail=false;
  console.log(upd.total_theory_questions+"update");
  console.log(upd.total_viva_question+"update");
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

            "assessment_mode":this.objpc.assessment_mode.toString(), //All fields are required
            "sector_id":this.objpc.sector_id.toString(),
            "job_role_id":this.objpc.job_role_id.toString(),
            "nos_id":this.objpc.nos_id.toString(),
            "nos_element_id":this.objpc.nos_element_id.toString(),
            "pc_name":this.objpc.pc_name.toString(),
            "pc_description":this.objpc.pc_description.toString(),
            "total_theory_marks":this.objpc.total_theory.toString(),
            "total_viva_marks":this.objpc.total_viva.toString(),
            "total_theory_questions":this.objpc.total_theory_questions.toString(),
            "total_viva_questions":this.objpc.total_viva_questions.toString(),
            "id":this.pcid.toString(),
             };

        console.log(this.upobj+"update query");
        this.pcserv
          .updatePCDETAILS(this.upobj)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Updated!', res.message, 'success');
              this.getallPCDetails();
              this.objpc.assessment_mode="";
              this.objpc.sector_id="";
              this.objpc.job_role_id="";
              this.objpc.nos_id ="";
              this.objpc.nos_element_name="";
              this.objpc.pc_name="";

              this.objpc.pc_description="";
              this.objpc.total_theory_questions="";
              this.objpc.total_viva_questions="";
              this.objpc.total_theory="";
              this.objpc.total_viva="";


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
oncreate()
{
  this.obj=
  {
    "assessment_mode":this.objpc.assessment_mode.toString(), //All fields are required
    "sector_id":this.objpc.sector_id.toString(),
    "job_role_id":this.objpc.job_role_id.toString(),
    "nos_id":this.objpc.nos_id.toString(),
    "nos_element_id":this.objpc.nos_element_id,
    "pc_name":this.objpc.pc_name.toString(),
    "pc_description":this.objpc.pc_description.toString(),
    "total_theory_marks":this.objpc.total_theory.toString(),
    "total_viva_marks":this.objpc.total_viva.toString(),
    "total_theory_questions":this.objpc.total_theory_questions.toString(),
    "total_practical":this.objpc.total_practical,
    "total_viva_questions":this.objpc.total_viva_questions.toString()

}
console.log(this.obj);
    this.pcserv.addPCDETAILS(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add PC Details', res.message, 'success');
        this.getallPCDetails();
      } else {
        //alert(res.message);
        this.toast.fire('Error', res.message, 'error');
      }
    });
}
// _pcdetails:pcdetails[]=[];
_pcdetails:any;
objdet:any;
details(v:any)
{
  this.dispflag=true;
  this.viewportScroller.scrollToPosition([0, 0]);
  // console.log(_cl);
  this.objdet=
  {
    "id":v.id
  }
  this.pcserv.detailsPCDETAILS(this.objdet).subscribe((res:APIResponse)=>{
    this._pcdetails=res.data;
    console.log("details"+this._pcdetails.pc_name);
    this.objpc.assessment_mode=this._pcdetails.assessment_mode;
  this.objpc.sector_name=this._pcdetails.sector_name;
  this.objpc.job_role=this._pcdetails.job_role_name;
  this.objpc.nos_id =this._pcdetails.nos_id;
  this.objpc.nos_element_name=this._pcdetails.nos_element_name;
  this.objpc.pc_name=this._pcdetails.pc_name;
  this.objpc.pc_description=this._pcdetails.pc_description;
  this.objpc.total_theory=this._pcdetails.total_theory_marks;
  this.objpc.total_viva=this._pcdetails.total_viva_marks;
  this.objpc.total_viva_questions=this._pcdetails.total_viva_questions;
  this.objpc.total_theory_questions=this._pcdetails.total_theory_questions;
  this.objpc.index_id=this._pcdetails.index_id;

  })


  //this.pcid=upd.id;
  this.flag = true;
  this.currentvalue=v;
    this.drawer.open();
    this.detail=true;
}

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

      this.pcserv.deletePCDETAILS(this.dlt).subscribe((res: APIResponse) => {
        if (res.status == 'success') {
          //alert(res.message);
          this.toast.fire('Record Deleted!', res.message, 'success');
          this.getallPCDetails();
        } else {
          this.toast.fire('Error', res.message, 'error');
        }
      });
      //alert("record updated");
     // this.flag = true;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
     // this.flag = false;
      this.toast.fire('Cancelled', 'Delete action is cancelled', 'error');
    }
  });
}
}
