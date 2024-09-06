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
import { APIResponse, country, jobrole, manageassessor, manageuser, nosdetails, noselement, pcdetails, sector } from '../../../core/models/API.Models';
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
import { ManageuserService } from '../../../core/services/manageuser.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusFilterPipe } from "../../../core/pipes/status-filter.pipe";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-manage-users',
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
    MatTooltipModule,
    StatusFilterPipe,
    MatSidenavModule
],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements AfterViewInit, OnInit {
  hide = true;
  constructor(
    private _formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
    // private jobroleserv:JobroleService,
    private sectorse:SectorService,
    private userserve:ManageuserService

  ) {
    this.getAllsector();
    this.getallusers();

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
     this.objuser.c_password='';
     this.objuser.company_name='';
     this.objuser.email='';
     this.objuser.is_first_user='';
     this.objuser.last_name='';
     this.objuser.middle_name='';
     this.objuser.mobile_number='';
     this.objuser.password='';
     this.objuser.role='';
     this.objuser.sector_id='';
     this.objuser.role='';
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
  objuser:manageuser=new manageuser();
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
'status',
'is_first_user',
   'sector_name',
   'first_name',
   'middle_name',
   'last_name',
   'email',
   'mobile_number',
   'company_name',



 ];
  datasource!: MatTableDataSource<manageuser>;
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

  //console.log(this.secotorList);
});
 }
  getallusers()
 {
  //;
  this.userserve.getAllUSERSList().subscribe((res: APIResponse) => {

    this.datasource = new MatTableDataSource<manageuser>(res.data);
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;

  });
 }

techfun(chk:any)
{
  if(chk==true)
   {
     this.objuser.is_first_user="1";
   }
   else
   {
    this.objuser.is_first_user="0";


   }
}
oncreate()
{
 this.obj=
 {
  "first_name":this.objuser.first_name,
  "middle_name":this.objuser.middle_name,
  "last_name":this.objuser.last_name,
  "email":this.objuser.email,
  "mobile_number":this.objuser.mobile_number,
  "password":this.objuser.password,
  "c_password":this.objuser.c_password,
  "role":this.objuser.role,
  "company_name":this.objuser.company_name,
  "is_first_user":this.objuser.is_first_user,
  "sector_id":this.objuser.sector_id
}


//console.log(this.obj);
   this.userserve.addUSERS(this.obj).subscribe((res: APIResponse) => {
     if (res.status == 'success') {
       // alert(res.message);
       this.toast.fire('Add User Details', res.message, 'success');
       this.getallusers();
     } else {
       //alert(res.message);
       this.toast.fire('Error', res.message, 'error');
       this.getallusers();
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
        this.userserve
          .activateUSERS(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              // alert(res.message);
              this.toast.fire('Active', res.message, 'success');
              sid.status = 'Active';
              this.getallusers();
            } else {
              // alert(res.message);
              this.toast.fire('Error', res.message, 'error');
            }
          });
      } else {
        this.userserve
          .deactivateUSERS(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Deactivated', res.message, 'success');
              sid.status ='Deactivated';
              this.getallusers();
            } else {
              this.toast.fire('Error', res.message, 'error');
            }
          });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      this.getallusers();

      this.toast.fire('Cancelled', 'No any changed', 'error');
    }
  });
  //sweet alert end

 }
 update(upd:any)
{
}

 onupdate()
 {

 }
 details(v:any)
 {
 }



}
