import { Component, InjectionToken, OnInit, viewChild } from '@angular/core';
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
import { APIResponse, country, scheme, sector } from '../../../core/models/API.Models';
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
import { SchemeService } from '../../../core/services/scheme.service';
import { DecimalNumberDirective } from '../../../core/directive/decimal-number.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusFilterPipe } from "../../../core/pipes/status-filter.pipe";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-manage-scheme',
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
  templateUrl: './manage-scheme.component.html',
  styleUrl: './manage-scheme.component.scss'
})
export class ManageSchemeComponent implements AfterViewInit, OnInit {

 constructor(
    private _formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
    private schemeserv:SchemeService,
    private sectorse:SectorService
  ) {
    this.objscheme.assessment_mode='Online';

    this.getAllsector();
    this.getAllScheme();
  }
  // sweetalert toster setting
  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  //sweetalert tostet setting end
  dispflag=false;
  currentvalue:any;
  detail=false;

  @ViewChild('drawer') drawer!: MatSidenav;

  openDrawer() {


    if(this.currentvalue!=null)
    {
      this.objscheme.assessment_mode='Online';
      this.objscheme.scheme_name='';
      this.objscheme.qualifying_percentage='';
      this.objscheme.scheme_details='',
      this.objscheme.sector_id='';

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
          this.schemeserv
            .activateSCHEME(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                // alert(res.message);
                this.toast.fire('Active', res.message, 'success');
                sid.status = 'Active';
                this.getAllScheme();
              } else {
                // alert(res.message);
                this.toast.fire('Error', res.message, 'error');
              }
            });
        } else {
          this.schemeserv
            .deactivateSCHEME(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                //alert(res.message);
                this.toast.fire('Deactivated', res.message, 'success');
                sid.status ='Deactivated';
                this.getAllScheme();
              } else {
                this.toast.fire('Error', res.message, 'error');
              }
            });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getAllScheme();

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
    'scheme_name',
    'sector_name',
    'qualifying_percentage',
    'scheme_details',
  ];

  datasource!: MatTableDataSource<scheme>;

  ngAfterViewInit() {
    this.getAllScheme();
  }
  flag: boolean = true;
  objscheme:scheme=new scheme();
  secotorList:sector[]=[];
  scheme_id: string = '';
  update(_cl: any) {
//;
    this.viewportScroller.scrollToPosition([0, 0]);
    console.log(_cl);
    this.objscheme.assessment_mode=_cl.assessment_mode;
    this.objscheme.sector_id = _cl.sector_id;
    this.objscheme.scheme_name = _cl.scheme_name;
    this.objscheme.sector_name=_cl.sector_name;
    this.objscheme.qualifying_percentage = _cl.qualifying_percentage;

    this.scheme_id = _cl.id;
    this.objscheme.scheme_details=_cl.scheme_details;

    // this.objscheme.scheme_pricing=_cl.scheme_pricing;
    this.flag = false;
    this.currentvalue=_cl;
    this.drawer.open();
    this.detail=false;
  }

  ngOnInit(): void {
    // this.datasource.paginator = this.paginator;
    this.getAllsector();
    this.getAllScheme();

  }
  getAllsector() {
    //;
    this.sectorse.getAllSECTORList().subscribe((res: APIResponse) => {
      //this.dispdata =res.data;
      // this.datasource = new MatTableDataSource<scheme>(res.data);
      // this.datasource.paginator = this.paginator;
      // this.datasource.sort = this.sort;
      this.secotorList=res.data;

      console.log(this.secotorList);
    });
  }
  currentPage: number = 1;
  pageSize: number=10;
  onpagesize(ps:number)
  {
    this.pageSize=ps;
  }
  onPageChange(page: number) {

    this.currentPage = page;

     this.getAllScheme();
  }
  objsch:any;
  getAllScheme() {

   this.objsch=
   {
    "perpage":this.pageSize,
    "page":this.currentPage,
    "sector_id":this.objscheme.sector_id
   }
    this.schemeserv.getAllScheme_pagewise(this.objsch).subscribe((res:APIResponse) => {
      // this.schemeserv.getAllSCHEMEList().subscribe((res: APIResponse) => {
      //this.dispdata =res.data;
      this.datasource = new MatTableDataSource<scheme>(res.data);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;

      console.log("scheme list"+this.datasource);
    });
  }

  // add country data function

  oncreate() {
    //  ;
    //  console.log(this.objcontry);
    this.obj = {

      assessment_mode:this.objscheme.assessment_mode,
    sector_id:this.objscheme.sector_id,
    scheme_name:this.objscheme.scheme_name,
    qualifying_percentage:this.objscheme.qualifying_percentage,
    scheme_details:this.objscheme.scheme_details,
    };
    console.log(this.obj);
    this.schemeserv.addSCHEME(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add Scheme', res.message, 'success');
        this.objscheme.scheme_name='';
        this.objscheme.qualifying_percentage='';
        this.objscheme.scheme_details='',
        this.getAllScheme();
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
          id:this.scheme_id.toString(),
          assessment_mode:this.objscheme.assessment_mode.toString(),
          sector_id:this.objscheme.sector_id.toString(),
          //sector_name:this.objscheme.sector_name,
          scheme_name:this.objscheme.scheme_name.toString(),
          qualifying_percentage:this.objscheme.qualifying_percentage.toString(),
          scheme_details:this.objscheme.scheme_details.toString(),
        };
        console.log(this.upobj);
        this.schemeserv
          .updateSCHEME(this.upobj)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Updated!', res.message, 'success');
              this.getAllScheme();

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
        this.schemeserv
          .deleteSCHEME(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Deleted!', res.message, 'success');
              this.getAllScheme();
            } else {
              console.log(res.message);
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


