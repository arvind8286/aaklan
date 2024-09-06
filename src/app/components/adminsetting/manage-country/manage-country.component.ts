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
import { NgIf } from '@angular/common';
import { CountrydataService } from '../../../core/services/countrydata.service';
import { APIResponse, country } from '../../../core/models/API.Models';
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
import { ViewportScroller } from '@angular/common';
import { DecimalNumberDirective } from '../../../core/directive/decimal-number.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModelCountryComponent } from './model-country/model-country.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-manage-country',
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
    DecimalNumberDirective,
    MatTooltipModule,
    ModelCountryComponent,
    MatSidenavModule,

],
  templateUrl: './manage-country.component.html',
  styleUrl: './manage-country.component.scss',
})
export class ManageCountryComponent implements AfterViewInit, OnInit {


  constructor(
    private contryserv: CountrydataService,
    private _formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
  ) {

    this.getAllcontry();
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
  isEditMode=false;

  @ViewChild('drawer') drawer!: MatSidenav;

  openDrawer() {

    debugger
    if(this.currentvalue!=null)
    {

      this.objcontry.country_name='';
      this.objcontry.country_code='';

      this.objcontry.dial='';
      this.isEditMode = false;
    }

    this.drawer.open();
  }
  close()
  {
    this.drawer.close();
  }


//   openAddTaskDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
//     this.isModalOpen = true;
//     this._dialog.open(ModelCountryComponent, {
//        // width: '600px',
//         enterAnimationDuration,
//         exitAnimationDuration,
//     });
// }

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

        this.dlt = { country_id: id.country_id.toString() };
        //console.log(id.status);
        if (id.status == 'Active') {
          this.contryserv
            .activatecountry(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                // alert(res.message);
                this.toast.fire('Active', res.message, 'success');
                id.status = 'Active';
                this.getAllcontry();
              } else {
                // alert(res.message);
                this.toast.fire('Error', res.message, 'error');
              }
            });
        } else {
          this.contryserv
            .deactivatecountry(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                //alert(res.message);
                this.toast.fire('Deactivated', res.message, 'success');
                id.status = 'Deactivated';
                this.getAllcontry();
              } else {
                this.toast.fire('Error', res.message, 'error');
              }
            });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getAllcontry();

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
    'country_id',
    'status',
    'country_name',
    'country_code',
    'dial',
  ];

  datasource!: MatTableDataSource<country>;

  ngAfterViewInit() {
    this.getAllcontry();
    this.datasource.paginator = this.paginator;
  }
  flag: boolean = true;


  objcontry: country = new country();
  contry_id: string = '';

  update(_cl: any) {

    this.viewportScroller.scrollToPosition([0, 0]);
    this.objcontry.country_name = _cl.country_name;
    this.objcontry.country_code = _cl.country_code;
    this.objcontry.dial = _cl.dial;
    this.flag = false;
    this.contry_id = _cl.country_id;
    this.currentvalue=_cl;
    this.isEditMode=true;

    this.drawer.open();
  }

  ngOnInit(): void {
    this.datasource.paginator = this.paginator;

    this.getAllcontry();
  }
  currentPage: number = 1;
  pageSize: number = 10;
  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllcontry();
  }
  getAllcontry() {
    // this.contryserv.getAllcountry().subscribe((res: APIResponse) => {
    //   //this.dispdata =res.data;
    //   this.datasource = new MatTableDataSource<country>(res.data);
    //   this.datasource.paginator = this.paginator;
    //   this.datasource.sort = this.sort;

    //   //console.log(this.dispdata);
    // });
    this.contryserv
      .getAllcountry_pagewise(this.currentPage, this.pageSize)
      .subscribe((res: APIResponse) => {
        //  this.datasource=res.data;
        this.datasource = new MatTableDataSource<country>(res.data);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      });
  }

  // add country data function

  onCountrysave() {
    //  debugger;
    //  console.log(this.objcontry);
    this.obj = {
      country_name: this.objcontry.country_name.toString(),
      country_code: this.objcontry.country_code.toString(),
      dial: this.objcontry.dial.toString(),
    };
    this.contryserv.addcountry(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add Country', res.message, 'success');
        this.getAllcontry();
      } else {
        //alert(res.message);
        this.getAllcontry();
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
          country_id: this.contry_id.toString(),
          country_name: this.objcontry.country_name.toString(),
          country_code: this.objcontry.country_code.toString(),
          dial: this.objcontry.dial.toString(),
        };
        this.contryserv
          .updatecountry(this.upobj)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Updated!', res.message, 'success');
              this.isEditMode = false;
              this.getAllcontry();
              this.objcontry.country_name = '';
              this.objcontry.country_code = '';
              this.objcontry.dial = '';
            } else {
              this.toast.fire('Error', res.message, 'error');
            }
          });
        //alert("record updated");
        this.flag = true;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.flag = false;
        this.toast.fire('Cancelled', 'update action is cancelled', 'error');
      }
    });
    //sweet alert end
  }
  dlt: any;
  deletecountry(id: any) {
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
        this.dlt = { country_id: id.country_id };
        this.contryserv
          .deletecountry(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Deleted!', res.message, 'success');
              this.getAllcontry();
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
