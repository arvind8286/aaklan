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
import { APIResponse, country, jobrole, nosdetails, sector } from '../../../core/models/API.Models';
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
import { DecimalNumberDirective } from '../../../core/directive/decimal-number.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusFilterPipe } from "../../../core/pipes/status-filter.pipe";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-manage-nos-details',
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
  templateUrl: './manage-nos-details.component.html',
  styleUrl: './manage-nos-details.component.scss'
})
export class ManageNosDetailsComponent implements AfterViewInit, OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
   //  private schemeserv:SchemeService,
   private jobroleserv:JobroleService,
    private sectorse:SectorService,
    private nosserv:NOS_DETAILSService
  ) {
    this.objnos.assessment_mode='Online';
    this.getAllsector();
   this.getalljobrole();
    this.getallnosdetails();
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

      this.objnos.assessment_mode="Online";
              this.objnos.sector_id="";
              this.objnos.job_role_id="";
              this.objnos.nos_code ="";
              this.objnos.nos_description="";
              this.objnos.nos_type="";
              this.objnos.total_theory ="";
              this.objnos.total_viva="";
              this.objnos.total_practical="";
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
  objnos:nosdetails=new nosdetails();
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
  'assessment_mode',
  'nos_code',
  'nos_description',
  'nos_type',
  'sector_name',
  'job_role',
  // 'job_type',

  'total_theory',
  'total_viva',
  'total_practical'


];
 datasource!: MatTableDataSource<nosdetails>;
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.datasource.filter = filterValue.trim().toLowerCase();
}
objjob:any;
getalljobrole() {
  this.objjob=
  {
    'sector_id':this.objnos.sector_id
  }
  //;
  this.jobroleserv.getAllJOB_ROLE(this.objjob).subscribe((res: APIResponse) => {
    //this.dispdata =res.data;
    // this.datasource = new MatTableDataSource<nosdetails>(res.data);
    // this.datasource.paginator = this.paginator;
    // this.datasource.sort = this.sort;
    this.jobroleList=res.data;
    if(this.jobroleList.length===1)
    {
      this.getallnosdetails();
    }
    console.log("jobrolelist:"+this.jobroleList);
  });
}

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
  if(this.secotorList.length===1)
  {
    this.getalljobrole();
  }
   console.log(this.secotorList);
 });
}
//display data of NOS Details
currentPage: number = 1;
  pageSize: number = 10;
  onPageChange(page: number) {
    this.currentPage = page;
    this.getallnosdetails();
  }

getallnosdetails() {
  //;
  this.nosserv.getAllNOS_Details_pagewise(this.currentPage, this.pageSize).subscribe((res: APIResponse) => {
    //this.dispdata =res.data;
    this.datasource = new MatTableDataSource<nosdetails>(res.data);
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;

    console.log(this.datasource);
  });
}
nosid:any;
//add NOS Details
oncreate()
{
  this.obj=
  {
    "assessment_mode":this.objnos.assessment_mode.toString(), //All fields are required
    "sector_id":this.objnos.sector_id.toString(),
    "job_role_id":this.objnos.job_role_id.toString(),
    "nos_code":this.objnos.nos_code.toString(),
    "nos_description":this.objnos.nos_description.toString(),
    "nos_type":this.objnos.nos_type.toString(),
    "total_theory": this.objnos.total_theory.toString(),
    "total_viva": this.objnos.total_viva.toString(),
    "total_practical": this.objnos.total_practical.toString()
}
console.log(this.obj);
    this.nosserv.addNOS_DETAILS(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add NOS Details', res.message, 'success');
        this.objnos.nos_code='';
        this.objnos.nos_description='';
        this.objnos.nos_type='';
        this.objnos.total_practical='';
        this.objnos.total_theory='';
        this.objnos.total_viva='';

        this.getallnosdetails();
      } else {
        //alert(res.message);
        this.toast.fire('Error', res.message, 'error');
      }
    });
}
dlt:any;
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
        this.nosserv
          .activateNOS_DETAILS(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              // alert(res.message);
              this.toast.fire('Active', res.message, 'success');
              sid.status = 'Active';
              this.getallnosdetails();
            } else {
              // alert(res.message);
              this.toast.fire('Error', res.message, 'error');
            }
          });
      } else {
        this.nosserv
          .deactivateNOS_DETAILS(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Deactivated', res.message, 'success');
              sid.status ='Deactivated';
              this.getallnosdetails();
            } else {
              this.toast.fire('Error', res.message, 'error');
            }
          });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      this.getallnosdetails();

      this.toast.fire('Cancelled', 'No any changed', 'error');
    }
  });
  //sweet alert end
}
update(upd:any)
{
  this.dispflag=false;
  this.viewportScroller.scrollToPosition([0, 0]);
  // console.log(_cl);
  this.objnos.assessment_mode=upd.assessment_mode;
  this.objnos.sector_id=upd.sector_id;
  this.objnos.job_role_id=upd.job_role_id;
  this.objnos.nos_code =upd.nos_code;
  this.objnos.nos_description=upd.nos_description;
  this.objnos.nos_type=upd.nos_type;
  this.objnos.total_theory =upd.total_theory;
  this.objnos.total_viva=upd.total_viva;
  this.objnos.total_practical=upd.total_practical;


  this.nosid=upd.id;
  this.flag = false;
  this.currentvalue=upd;
  this.drawer.open();
  this.detail=false;
}
details(v:any)
{
  this.dispflag=true;
  this.viewportScroller.scrollToPosition([0, 0]);
  // console.log(_cl);
  this.objnos.assessment_mode=v.assessment_mode;
  this.objnos.sector_name=v.sector_name;
  this.objnos.job_role=v.job_role;
  this.objnos.nos_code =v.nos_code;
  this.objnos.nos_description=v.nos_description;
  this.objnos.nos_type=v.nos_type;
  this.objnos.total_theory =v.total_theory;
  this.objnos.total_viva=v.total_viva;
  this.objnos.index_id=v.index_id;
  this.objnos.total_practical=v.total_practical;

  this.nosid=v.id;
  this.currentvalue=v;
    this.detail=true;
    this.drawer.open();
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

            "assessment_mode":this.objnos.assessment_mode.toString(), //All fields are required
            "sector_id":this.objnos.sector_id.toString(),
            "job_role_id":this.objnos.job_role_id.toString(),
            "nos_code":this.objnos.nos_code.toString(),
            "nos_description":this.objnos.nos_description.toString(),
            "nos_type":this.objnos.nos_type.toString(),
            "total_theory": this.objnos.total_theory.toString(),
            "total_viva": this.objnos.total_viva.toString(),
            "total_practical": this.objnos.total_practical.toString(),
            "id":this.nosid.toString()
             };

        console.log(this.upobj);
        this.nosserv
          .updateNOS_DETAILS(this.upobj)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Updated!', res.message, 'success');
              this.getallnosdetails();

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
      this.nosserv
        .deleteNOS_DETAILS(this.dlt)
        .subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            //alert(res.message);
            this.toast.fire('Record Deleted!', res.message, 'success');
            this.getallnosdetails();
          } else {
            console.log(res.message);
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
