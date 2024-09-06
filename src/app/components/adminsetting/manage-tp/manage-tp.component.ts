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
  city,
  country,
  jobrole,
  managetp,
  nosdetails,
  noselement,
  pcdetails,
  sector,
  state,
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
import { JobroleService } from '../../../core/services/jobrole.service';
import { SectorService } from '../../../core/services/sector.service';
import { NOS_DETAILSService } from '../../../core/services/nosdetails.service';
import { NoselementService } from '../../../core/services/noselement.service';
import { PcdetailService } from '../../../core/services/pcdetail.service';
import { ManagetpService } from '../../../core/services/managetp.service';
import { STATEService } from '../../../core/services/state.service';
import { CityService } from '../../../core/services/city.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MobileNumberDirective } from '../../../core/directive/mobile-number.directive';
import { StatusFilterPipe } from '../../../core/pipes/status-filter.pipe';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-manage-tp',
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
    MatTooltipModule,
    MobileNumberDirective,
    StatusFilterPipe,
    MatSidenavModule,
  ],
  templateUrl: './manage-tp.component.html',
  styleUrl: './manage-tp.component.scss',
})
export class ManageTpComponent implements AfterViewInit, OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
    private countryserve: CountrydataService,
    private stateserve: STATEService,
    private cityserve: CityService,
    private tpserv: ManagetpService
  ) {
    this.objtp.country_id="QXhCL096NVZNN0dDRjZSYjZiTUtGdz09";
    this.getcontrylist();
    this.getAllstatelist();
    this.getAllCitydata();
    this.getallmanagetp();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'index_id',
    'status',
    'training_partner_name',
    'training_partner_address',
    'contact_person',
    'contact_number',
    'country_name',
    'state_name',
    'city_name',
    'pincode',

  ];
  datasource!: MatTableDataSource<managetp>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  currentvalue: any;
  detail = false;

  @ViewChild('drawer') drawer!: MatSidenav;

  openDrawer() {
    if (this.currentvalue != null) {
      this.objtp.country_id = '';
      this.objtp.state_id = '';
      this.objtp.city_id = '';
      this.objtp.training_partner_name = '';
      this.objtp.training_partner_address = '';
      this.objtp.pincode = '';
      this.objtp.contact_person = '';
      this.objtp.contact_number = '';
      this.flag = true;
      this.detail = false;
      this.dispflag = false;
    }

    this.drawer.open();
  }
  close() {
    this.drawer.close();
  }

  getcontrylist() {
    this.countryserve.getAllcountryList().subscribe((res: any) => {
      this.countrylist = res.data;
    });
  }
  //get all state list
  getAllstatelist() {
    // debugger;
    var objcontid: any = { "country_id": this.objtp.country_id };
    // console;
    this.stateserve.getAllSTATEList(objcontid).subscribe((res: APIResponse) => {
      this.statelist = res.data;
      // console.log(this.getdatastate);
    });
  }

  //state list end

  getAllCitydata() {
    //debugger;
    var dispdata: any = {
      country_id: this.objtp.country_id,
      state_id: this.objtp.state_id,
    };
    this.cityserve.getAllCITY(dispdata).subscribe((res: APIResponse) => {
      // console.log(res.message);
      // this.datasource = new MatTableDataSource<city>(res.data);
      // this.datasource.paginator = this.paginator;
      this.citylist = res.data;

      // console.log(this.citylist);
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

  ngOnInit(): void {}
  ngAfterViewInit() {
    // this.getAllScheme();
  }
  flag = true;
  obj: any;
  dispflag = false;
  countrylist: country[] = [];
  statelist: state[] = [];
  citylist: city[] = [];
  objtp: managetp = new managetp();

  oncreate() {
    this.obj = {
      country_id: this.objtp.country_id, //All fields are required
      state_id: this.objtp.state_id,
      city_id: this.objtp.city_id,
      training_partner_name: this.objtp.training_partner_name, //max 100
      training_partner_address: this.objtp.training_partner_address, //max 200
      pincode: this.objtp.pincode,
      contact_person: this.objtp.contact_person,
      contact_number: this.objtp.contact_number,
    };
    console.log(this.obj);
    //debugger
    this.tpserv.addTP(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Added Training Partner', res.message, 'success');
        this.objtp.training_partner_name = '';
        this.objtp.training_partner_address = '';
        this.objtp.pincode = '';
        this.objtp.contact_person = '';
        this.objtp.contact_number = '';
        this.getallmanagetp();
        // this.get();
      } else {
        //alert(res.message);
        this.toast.fire('Error', res.message, 'error');
      }
    });
  }
  currentPage: number = 1;
  pageSize: number = 10;
  onPageChange(page: number) {
    this.currentPage = page;
    this.getallmanagetp();
  }
  getallmanagetp() {
    this.tpserv
      .getAllTP_pagewise(this.currentPage, this.pageSize)
      .subscribe((res: APIResponse) => {
        //this.dispdata =res.data;
        this.datasource = new MatTableDataSource<managetp>(res.data);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;

        console.log(this.datasource);
      });
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
          this.tpserv.activateTP(this.dlt).subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              // alert(res.message);
              this.toast.fire('Active', res.message, 'success');
              sid.status = 'Active';
              this.getallmanagetp();
            } else {
              // alert(res.message);
              this.toast.fire('Error', res.message, 'error');
            }
          });
        } else {
          this.tpserv.deactivateTP(this.dlt).subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Deactivated', res.message, 'success');
              sid.status = 'Deactivated';
              this.getallmanagetp();
            } else {
              this.toast.fire('Error', res.message, 'error');
            }
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getallmanagetp();

        this.toast.fire('Cancelled', 'No any changed', 'error');
      }
    });
    //sweet alert end
  }
  tpid: any;
  tpdetail:any;
  update(upd: any) {

    this.dispflag = false;
    this.viewportScroller.scrollToPosition([0, 0]);
    this.tpserv.detailsTP({"id":upd.id}).subscribe((res:APIResponse)=>{
    this.tpdetail=res.data;
    this.objtp.country_id = this.tpdetail.country_id;
    this.objtp.state_id = this.tpdetail.state_id;
    this.objtp.city_id = this.tpdetail.city_id;
    this.objtp.training_partner_name = this.tpdetail.training_partner_name;
    this.objtp.training_partner_address = this.tpdetail.training_partner_address;
    this.objtp.pincode = this.tpdetail.pincode;
    this.objtp.contact_person = this.tpdetail.contact_person;
    this.objtp.contact_number = this.tpdetail.contact_number;

    this.tpid = this.tpdetail.id;

    });
    // console.log(_cl);
    this.flag = false;
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
          country_id: this.objtp.country_id.toString(), //All fields are required
          state_id: this.objtp.state_id.toString(),
          city_id: this.objtp.city_id.toString(),
          training_partner_name: this.objtp.training_partner_name.toString(), //max 100
          training_partner_address:
            this.objtp.training_partner_address.toString(), //max 200
          pincode: this.objtp.pincode.toString(),
          contact_person: this.objtp.contact_person.toString(),
          contact_number: this.objtp.contact_number.toString(),

          id: this.tpid,
        };

        console.log(this.upobj + 'update query');
        this.tpserv.updateTP(this.upobj).subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            //alert(res.message);
            this.toast.fire('Record Updated!', res.message, 'success');
            this.getallmanagetp();

            // this.flag = true;
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
    // this.dispflag = true;
    this.viewportScroller.scrollToPosition([0, 0]);
    // console.log(_cl);
    this.objtp.country_name = v.country_name;
    this.objtp.state_name = v.state_name;
    this.objtp.city_name = v.city_name;
    this.objtp.training_partner_name = v.training_partner_name;
    this.objtp.training_partner_address = v.training_partner_address;
    this.objtp.pincode = v.pincode;
    this.objtp.contact_person = v.contact_person;
    this.objtp.contact_number = v.contact_number;
    this.objtp.index_id = v.index_id;

    this.tpid = v.id;

    this.currentvalue = v;
    this.drawer.open();
    this.detail = true;
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

        this.tpserv.deleteTP(this.dlt).subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            //alert(res.message);
            this.toast.fire('Record Deleted!', res.message, 'success');
            this.getallmanagetp();
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
