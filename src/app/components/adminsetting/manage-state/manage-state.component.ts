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
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CountrydataService } from '../../../core/services/countrydata.service';
import { APIResponse, country, state } from '../../../core/models/API.Models';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusFilterPipe } from '../../../core/pipes/status-filter.pipe';
import {
  MatDrawer,
  MatSidenav,
  MatSidenavModule,
} from '@angular/material/sidenav';

@Component({
  selector: 'app-manage-state',
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
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    StatusFilterPipe,
    CommonModule,
    MatInputModule,
    MatSidenav,
    MatDrawer,
    MatSidenavModule,
  ],
  templateUrl: './manage-state.component.html',
  styleUrl: './manage-state.component.scss',
})
export class ManageStateComponent implements AfterViewInit, OnInit {
  countryCtrl = new FormControl('');
  filteredOptions!: Observable<country[]>;
  readonly value: any;
  readonly valueChanges!: Observable<country>;
  constructor(
    private stateserv: STATEService,
    private contryserv: CountrydataService
  ) {
    this.countryCtrl.setValue('India');
    this.getcontrylist();
  }
  // myControl = new FormControl('',);
  // filteredOptions!: Observable<country[]>;
  getdatacountry: country[] = [];
  statelist: state[] = [];
  selectedItem: any;

  currentvalue: any;

  @ViewChild('drawer') drawer!: MatSidenav;

  openDrawer() {
    if (this.currentvalue != null) {
      this.objstate.country_name = '';
      this.objstate.state_name = '';
      this.objstate.state_code = '';
      this.flag = true;
    }

    this.drawer.open();
  }
  close() {
    this.drawer.close();
  }
  ngOnInit(): void {
    this.filteredOptions = this.countryCtrl.valueChanges.pipe(
      startWith(''),
      map((ctry) =>
        ctry ? this._filtercountry(ctry) : this.getdatacountry.slice()
      )
    );
    // this.datasource.paginator = this.paginator;
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filterlist(value || '')),
    // );
    // console.log()

    //this.getAllstate();
  }

  // private _filterlist(value: string): country[] {
  //   const filterValue = value.toLocaleLowerCase();
  //   //console.log(filterValue);
  //   return this.getdatacountry.filter(opt=>opt.country_name.toLowerCase().includes(filterValue));
  // }
  optionSelected(event: any) {
    //debugger;
    this.objstate.country_name = event.option.value.country_name;
    // this.selectedItem = event.option.value.country_id;
    //console.log(this.selectedItem);
  }

  // @ViewChild('hiddenField') hiddenField!: ElementRef;

  // fetchDataFromHiddenField() {
  //   const hiddenValue = this.hiddenField.nativeElement.value;
  //   // Do something with hiddenValue
  // }

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

        this.dlt = { state_id: id.state_id };
        //console.log(id.status);
        if (id.status == 'Active') {
          this.stateserv
            .activateSTATE(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                // alert(res.message);
                this.toast.fire('Active', res.message, 'success');
                id.status = 'Active';
                this.getAllstate();
              } else {
                // alert(res.message);
                this.toast.fire('Error', res.message, 'error');
              }
            });
        } else {
          this.stateserv
            .deactivateSTATE(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                //alert(res.message);
                this.toast.fire('Deactivated', res.message, 'success');
                id.status = 'Deactivated';
                this.getAllstate();
              } else {
                this.toast.fire('Error', res.message, 'error');
              }
            });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getAllstate();

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
    'state_id',
    'status',
    'state_name',
    'state_code',
    'country_name',
  ];

  datasource!: MatTableDataSource<state>;

  ngAfterViewInit() {
    //this.getcontrylist();
    this.getAllstate();
  }
  flag: boolean = true;

  // objcontry: country = new country();
  state_id: string = '';
  objstate: state = new state();
  val!: string;
  update(_cl: any) {
    this.objstate.country_id = _cl.country_id;
    this.objstate.state_name = _cl.state_name;
    this.objstate.state_code = _cl.state_code;
    this.flag = false;
    this.state_id = _cl.state_id;
    this.val = _cl.country_name;
    this.countryCtrl.setValue(this.val);

    this.currentvalue = _cl;
    this.drawer.open();
  }
  disp: any;

  _filtercountry(value: string): country[] {
    // debugger;
    const filterValue = value.toLowerCase();
    this.disp = this.getdatacountry.filter((state) =>
      state.country_name.toLowerCase().includes(filterValue)
    );
    //console.log(this.disp[0].country_id);
    this.objstate.country_id = this.disp[0].country_id;
    return this.disp;
  }
  getcontrylist() {
    this.contryserv.getAllcountryList().subscribe((res: any) => {
      //this.dispdata =res.data;
      // this.datasource = new MatTableDataSource<country>(res.data);
      // this.datasource.paginator = this.paginator;
      // this.datasource.sort = this.sort;
      this.getdatacountry = res.data;

      //console.log(this.getdatacountry);
    });
  }
  getAllstatelist() {
    this.getAllstate();
  }
  //get all state list
  // cid:any;
  currentPage: number = 1;
  pageSize: number = 10;
  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllstate();
  }
  objc: any;
  getAllstate() {
    if (this.objstate.country_id == '') {
      //debugger;
      this.objc = {
        //"country_id":this.objstate.country_id,
        country_name: 'India',
      };
    } else {
      this.objc = {
        country_id: this.objstate.country_id,
        // "country_name":"India"
      };
    }
    console.log(this.objc);
    this.stateserv
      .getAllstate_pagewise(this.objc, this.currentPage, this.pageSize)
      .subscribe((res: APIResponse) => {
        //console.log(res.message);
        this.datasource = new MatTableDataSource<state>(res.data);
        this.datasource.paginator = this.paginator;
        this.statelist = res.data;
        // console.log(this.datasource);
      });
  }

  //state list end

  // add country data function

  onsave() {
    //  debugger;
    //  console.log(this.objcontry);
    this.obj = {
      country_id: this.objstate.country_id,

      state_name: this.objstate.state_name,
      state_code: this.objstate.state_code,
    };
    this.stateserv.addSTATE(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add Country', res.message, 'success');
        this.objstate.state_code='';
        this.objstate.state_name='';
        this.getAllstate();
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
          state_id: this.state_id,
          country_id: this.objstate.country_id,
          state_name: this.objstate.state_name,
          state_code: this.objstate.state_code,
        };
        this.stateserv.updateSTATE(this.upobj).subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            //alert(res.message);
            this.toast.fire('Record Updated!', res.message, 'success');
            this.getAllstate();
            // this.objstate.country_name = '';
            // this.objstate.state_name = '';
            // this.objstate.state_code = '';
          } else {
            this.toast.fire('Error', res.message, 'error');
          }
        });
        //alert("record updated");
        //this.flag = true;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //this.flag = false;
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
        this.dlt = { state_id: id.state_id };
        this.stateserv.deleteSTATE(this.dlt).subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            //alert(res.message);
            this.toast.fire('Record Deleted!', res.message, 'success');
            this.getAllstate();
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
