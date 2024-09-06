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
import { APIResponse, country, sector } from '../../../core/models/API.Models';
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
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MobileNumberDirective } from '../../../core/directive/mobile-number.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CountrydataService } from '../../../core/services/countrydata.service';
import { StatusFilterPipe } from '../../../core/pipes/status-filter.pipe';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-manage-sector',
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
    NgScrollbarModule,
    MobileNumberDirective,
    MatTooltipModule,
    StatusFilterPipe,
    NgFor,
    MatSidenavModule
  ],
  templateUrl: './manage-sector.component.html',
  styleUrl: './manage-sector.component.scss',
})
export class ManageSectorComponent implements AfterViewInit, OnInit {
  constructor(
    private sectorserv: SectorService,
    private _formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
    private countryserv: CountrydataService
  ) {
    this.objsector.assessment_mode='Online';

    this.getAllsector();
    this.objsector.mobile_code = '91';
    this.getcountry();
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

      this.objsector.assessment_mode = 'Online';
      this.objsector.contact_person = '';
      this.objsector.email = '';
      this.objsector.sector_name = '',
      this.objsector.mobile = '';
      this.objsector.mobile_code = '';
      this.objsector.details = '';
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  countryList: country[] = [];
  getcountry() {
    this.countryserv.getAllcountryList().subscribe((res: APIResponse) => {
      this.countryList = res.data;
      //console.log(this.countryList);
    });
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

        this.dlt = { id: sid.id };
        // console.log(this.dlt);
        if (sid.status == 'Active') {
          this.sectorserv
            .activateSECTOR(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                // alert(res.message);
                this.toast.fire('Active', res.message, 'success');
                sid.status = 'Active';
                this.getAllsector();
              } else {
                // alert(res.message);
                this.toast.fire('Error', res.message, 'error');
              }
            });
        } else {
          this.sectorserv
            .deactivateSECTOR(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                //alert(res.message);
                this.toast.fire('Deactivated', res.message, 'success');
                sid.status = 'Deactivated';
                this.getAllsector();
              } else {
                this.toast.fire('Error', res.message, 'error');
              }
            });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getAllsector();

        this.toast.fire('Cancelled', 'No any changed', 'error');
      }
    });
    //sweet alert end
  }

  obj: any;
  upobj: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'index_id',
    'status',
    'assessment_mode',
    'sector_name',
    'contact_person',
    'email',
    'mobile',
    // 'mobile_code',
    //'details',
  ];

  datasource!: MatTableDataSource<sector>;

  ngAfterViewInit() {
    this.getAllsector();
  }
  flag: boolean = true;
  objsector: sector = new sector();
  sector_id: string = '';
  dispflag = false;

  update(_cl: any) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.objsector.sector_name = _cl.sector_name;
    this.objsector.assessment_mode = _cl.assessment_mode;
    this.objsector.contact_person = _cl.contact_person;

    this.sector_id = _cl.id;
    this.objsector.email = _cl.email;
    this.objsector.mobile = _cl.mobile;
    this.objsector.mobile_code = _cl.mobile_code;
    this.objsector.details = _cl.details;
    this.flag = false;
    this.dispflag = false;
    this.currentvalue=_cl;
    this.drawer.open();
    this.detail=false;
  }

  ngOnInit(): void {
    // this.datasource.paginator = this.paginator;

    this.getAllsector();
  }
  currentPage: number = 1;
  pageSize: number = 10;
  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllsector();
  }
  getAllsector() {
    // debugger;
    this.sectorserv.getAllSector_pagewise(this.currentPage, this.pageSize).subscribe((res: APIResponse) => {
      //this.dispdata =res.data;
      this.datasource = new MatTableDataSource<sector>(res.data);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;

      console.log(this.datasource);
    });
  }

  // add country data function

  oncreate() {
    //  debugger;
    //  console.log(this.objcontry);
    this.obj = {
      assessment_mode: this.objsector.assessment_mode.toString(),
      sector_name: this.objsector.sector_name.toString(),
      contact_person: this.objsector.contact_person.toString(),
      email: this.objsector.email.toString(),
      mobile_code: this.objsector.mobile_code.toString(),
      mobile: this.objsector.mobile.toString(),
      details: this.objsector.details.toString(),
    };
    console.log(this.obj);
    this.sectorserv.addSECTOR(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add Record', res.message, 'success');
        this.objsector.contact_person='';
        this.objsector.details ='';
        this.objsector.email='';
        this.objsector.mobile='';
        this.objsector.sector_name='';

        this.getAllsector();
        this.drawer.close();

      } else {
        //alert(res.message);
        this.toast.fire('Error', res.message, 'error');
      }
    });
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
          id: this.sector_id.toString(),
          assessment_mode: this.objsector.assessment_mode.toString(),
          sector_name: this.objsector.sector_name.toString(),
          contact_person: this.objsector.contact_person.toString(),
          email: this.objsector.email.toString(),
          mobile_code: this.objsector.mobile_code.toString(),
          mobile: this.objsector.mobile.toString(),
          details: this.objsector.details.toString(),
        };
        this.sectorserv
          .updateSECTOR(this.upobj)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Updated!', res.message, 'success');
              this.getAllsector();

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

        this.sectorserv.deleteSECTOR(this.dlt).subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            //alert(res.message);
            this.toast.fire('Record Deleted!', res.message, 'success');
            this.getAllsector();
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

  details(v: any) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.objsector.sector_name = v.sector_name;
    this.objsector.assessment_mode = v.assessment_mode;
    this.objsector.contact_person = v.contact_person;

    this.sector_id = v.id;
    this.objsector.email = v.email;
    this.objsector.mobile = v.mobile;
    this.objsector.mobile_code = v.mobile_code;
    this.objsector.details = v.details;
    this.dispflag = true;
    this.currentvalue=v;
    this.detail=true;
    this.drawer.open();
  }
}
