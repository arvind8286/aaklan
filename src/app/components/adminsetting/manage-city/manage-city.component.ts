import { Component, ElementRef, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { CountrydataService } from '../../../core/services/countrydata.service';
import { APIResponse, city, country, state } from '../../../core/models/API.Models';
import {
  FormBuilder,
  FormControl,
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
import { STATEService } from '../../../core/services/state.service';
import { CountryPipe } from '../../../Share/pipes/country.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { CityService } from '../../../core/services/city.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusFilterPipe } from "../../../core/pipes/status-filter.pipe";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-manage-city',
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
    CountryPipe,
    NgFor,
    MatAutocompleteModule,
    AsyncPipe,
    MatTooltipModule,
    StatusFilterPipe,
    MatSidenavModule
],
  templateUrl: './manage-city.component.html',
  styleUrl: './manage-city.component.scss'
})
export class ManageCityComponent implements AfterViewInit, OnInit {
  constructor(
    private stateserv: STATEService,
    private contryserv: CountrydataService,
    private _formBuilder: FormBuilder,
    private cityserve:CityService
  ) {
    this.objcity.country_id="QXhCL096NVZNN0dDRjZSYjZiTUtGdz09";
    this.objcity.state_id="R05ZMWVyTzNzeFNPRnl2NzdnNHdxdz09";
    this.getcontrylist();
    this.getAllstatelist();
    this.getAllCitydata();


  }

  getdatacountry: country[] = [];

  objcity:city=new city();
  citylist:city[]=[];
  getdatastate: state[] = [];

  currentvalue:any;

  @ViewChild('drawer') drawer!: MatSidenav;

  openDrawer() {


    if(this.currentvalue!=null)
    {

      this.objcity.country_name='';
      this.objcity.state_id='';
      this.objcity.city_name='';
      this.flag=true;
    }

    this.drawer.open();
  }
  close()
  {
    this.drawer.close();
  }
  ngOnInit(): void {


   // this.getAllCitydata();

  }
 //function declarion start
 load_data_in_ngrid() {
  // debugger;
  this.getAllCitydata();

}


  // sweetalert toster setting
  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  //sweetalert tostet setting end

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  //status function start
  statusfun(id: any) {
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
        id.status = id.status === 'Active' ? 'Deactivated' : 'Active';

        this.dlt = { city_id: id.city_id };
        //console.log(id.status);
        if (id.status == 'Active') {
          this.cityserve
            .activateCITY(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                // alert(res.message);
                this.toast.fire('Active', res.message, 'success');
                id.status = 'Active';
                this.getAllCitydata();
              } else {
                // alert(res.message);
                this.toast.fire('Error', res.message, 'error');
              }
            });
        } else {
          this.cityserve
            .deactivateCITY(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                //alert(res.message);
                this.toast.fire('Deactivated', res.message, 'success');
                id.status = 'Deactivated';
                this.getAllCitydata();
              } else {
                this.toast.fire('Error', res.message, 'error');
              }
            });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getAllCitydata();
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
    'city_id',
    'status',
    'city_name',
    'state_name',
    'country_name',
  ];

  datasource!: MatTableDataSource<city>;

  ngAfterViewInit() {

  }

  flag: boolean = true;

  // objcontry: country = new country();
  state_id: string = '';
  city_id:string='';
  objstate: state = new state();
  update(_cl: any) {
    debugger;
    this.objcity.country_id = _cl.country_id;
    this.objcity.state_id = _cl.state_id;
    this.objcity.city_name = _cl.city_name;

    this.city_id = _cl.id;

    this.flag = false;
    this.currentvalue=_cl;
    this.drawer.open();
  }

  objdata:any;
  getcontrylist() {

    this.contryserv.getAllcountry().subscribe((res: any) => {
      //this.dispdata =res.data;
      // this.datasource = new MatTableDataSource<country>(res.data);
      // this.datasource.paginator = this.paginator;
      // this.datasource.sort = this.sort;
      this.getdatacountry = res.data;

      //console.log(this.getdatacountry);
    });
  }
  //get all state list
  getAllstatelist() {

    debugger;
    var objcontid: any = { country_id: this.objcity.country_id };
    // console;

    this.stateserv.getAllSTATEList(objcontid).subscribe((res: APIResponse) => {
      this.getdatastate = res.data;
      console.log("state list:"+this.getdatastate);
    });
  }

  //state list end
  currentPage: number = 1;
  pageSize: number = 10;
  onPageChange(page: number) {
  this.currentPage = page;
  this.getAllCitydata();
  }


  getAllCitydata() {
    // debugger;
  //   if(this.datasource==null)
  //     {
  //   //debugger;
  //   var dispdata: any = {
  //     country_name: "India",
  //     state_name: "Delhi",

  //   };
  // }
  // else
  // {

  //   var dispdata: any = {
  //     country_id: this.objcity.country_id,
  //     state_id: this.objcity.state_id,
  //   };
  // }

    var dispdata: any = {
      country_id: this.objcity.country_id,
      state_id: this.objcity.state_id,
    };
    this.cityserve.getAllCity_pagewise(dispdata,this.currentPage,this.pageSize).subscribe((res: APIResponse) => {
      // console.log(res.message);
      this.datasource = new MatTableDataSource<city>(res.data);
      this.datasource.paginator = this.paginator;
      // this.citylist = res.data;

      // console.log(this.citylist);
    });
  }


  // add country data function

  onsave() {
    //  debugger;
    //  console.log(this.objcontry);
    this.obj = {
      state_id: this.objcity.state_id,
      country_id: this.objcity.country_id,
      city_name: this.objcity.city_name,
      // city_id: this.objcity.city_id,

    };
    console.log(this.obj);
    this.cityserve.addCITY(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add City', res.message, 'success');
        this.objcity.city_name='';
        this.drawer.close();
        this.getAllCitydata();
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

          state_id: this.objcity.state_id,
        country_id: this.objcity.country_id,
        city_name: this.objcity.city_name,
        city_id: this.city_id,
        };
        this.cityserve
          .updateCITY(this.upobj)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Updated!', res.message, 'success');
              this.getAllCitydata();
              // this.objstate.country_name = '';
              // this.objstate.country_id = '';
              // this.objstate.state_id = '';
            } else {
              this.toast.fire('Error', res.message, 'error');
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
  ondelete(id: any) {
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
        this.dlt = { city_id: id.city_id };
        this.cityserve
          .deleteCITY(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Deleted!', res.message, 'success');
              this.getAllCitydata();
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
}
