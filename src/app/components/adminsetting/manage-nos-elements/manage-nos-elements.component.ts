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
  country,
  jobrole,
  nosdetails,
  noselement,
  sector,
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusFilterPipe } from '../../../core/pipes/status-filter.pipe';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-manage-nos-elements',
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
    StatusFilterPipe,
    MatSidenavModule,
  ],
  templateUrl: './manage-nos-elements.component.html',
  styleUrl: './manage-nos-elements.component.scss',
})
export class ManageNosElementsComponent implements AfterViewInit, OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
    //  private schemeserv:SchemeService,
    private jobroleserv: JobroleService,
    private sectorse: SectorService,
    private nosserv: NOS_DETAILSService,
    private noselemserv: NoselementService
  ) {
    this.objnoselm.assessment_mode='Online';

    this.getAllsector();
    this.getalljobrole();
    this.getallnosdetails();
    this.getallnoselement();
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
  currentvalue: any;
  detail = false;

  @ViewChild('drawer') drawer!: MatSidenav;

  openDrawer() {
    if (this.currentvalue != null) {
      this.objnoselm.assessment_mode = 'Online';
      this.objnoselm.sector_id = '';
      this.objnoselm.job_role_id = '';
      this.objnoselm.nos_id = '';
      this.objnoselm.nos_element_name = '';
      this.objnoselm.job_role = '';
      this.flag = true;
      this.detail = false;
      this.dispflag = false;
    }

    this.drawer.open();
  }
  close() {
    this.drawer.close();
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    // this.getAllScheme();
  }

  secotorList: sector[] = [];
  jobroleList: jobrole[] = [];
  // objjobrole:jobrole=new jobrole();
  noslist: nosdetails[] = [];
  objnoselm: noselement = new noselement();

  flag = true;
  obj: any;
  dispflag = false;
  detailsjobrol: any; //jobrole;//=new jobrole();
  upobj: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'index_id',
    'status',
    'assessment_mode',
    'nos_element_name',
    'nos_code',

    'sector_name',
    'job_role',
    // 'job_type',
  ];
  datasource!: MatTableDataSource<noselement>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  getAllsector() {
    //;
    this.sectorse.getAllSECTORList().subscribe((res: APIResponse) => {
      //this.dispdata =res.data;
      // this.datasource = new MatTableDataSource<scheme>(res.data);
      // this.datasource.paginator = this.paginator;
      // this.datasource.sort = this.sort;
      this.secotorList = res.data;
      if (this.secotorList.length === 1) {
        this.objnoselm.sector_id = this.secotorList[0].id;
        this.getalljobrole();
      }

      console.log('sector list:' + this.secotorList);
    });
  }
  objob: any;
  getalljobrole() {
    this.objob = {
      sector_id: this.objnoselm.sector_id,
    };
    //;
    this.jobroleserv
      .getAllJOB_ROLE(this.objob)
      .subscribe((res: APIResponse) => {
        //this.dispdata =res.data;
        // this.datasource = new MatTableDataSource<nosdetails>(res.data);
        // this.datasource.paginator = this.paginator;
        // this.datasource.sort = this.sort;
        this.jobroleList = res.data;
        if (this.jobroleList.length === 1) {
          this.objnoselm.job_role_id = this.jobroleList[0].id;

          this.getallnosdetails();
        }
        console.log(this.datasource);
      });
  }

  objnos: any;
  getallnosdetails() {
    debugger;
    this.objnos = {
      job_role_id: this.objnoselm.job_role_id,
      sector_id: this.objnoselm.sector_id,
    };
    //;
    this.nosserv
      .getAllNOS_DETAILS(this.objnos)
      .subscribe((res: APIResponse) => {
        //this.dispdata =res.data;
        // this.datasource = new MatTableDataSource<nosdetails>(res.data);
        // this.datasource.paginator = this.paginator;
        // this.datasource.sort = this.sort;
        this.noslist = res.data;

        console.log('nosdetials:' + this.datasource);
      });
  }

  oncreate() {
    this.obj = {
      assessment_mode: this.objnoselm.assessment_mode.toString(), //All fields are required
      sector_id: this.objnoselm.sector_id.toString(),
      job_role_id: this.objnoselm.job_role_id.toString(),
      nos_id: this.objnoselm.nos_id.toString(),
      nos_element_name: this.objnoselm.nos_element_name.toString(),
    };
    console.log(this.obj);
    this.noselemserv.addNOS_ELEMETNS(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add NOS Elements', res.message, 'success');
        this.objnoselm.nos_element_name='';

        this.getallnoselement();
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
    this.getallnosdetails();
  }
  getallnoselement() {
    //;
    this.noselemserv
      .getAllNOS_ELEMNT_pagewise(this.currentPage, this.pageSize)
      .subscribe((res: APIResponse) => {
        //this.dispdata =res.data;
        this.datasource = new MatTableDataSource<noselement>(res.data);
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
          this.noselemserv
            .activateNOS_ELEMETNS(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                // alert(res.message);
                this.toast.fire('Active', res.message, 'success');
                sid.status = 'Active';
                this.getallnoselement();
              } else {
                // alert(res.message);
                this.toast.fire('Error', res.message, 'error');
              }
            });
        } else {
          this.noselemserv
            .deactivateNOS_ELEMETNS(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                //alert(res.message);
                this.toast.fire('Deactivated', res.message, 'success');
                sid.status = 'Deactivated';
                this.getallnoselement();
              } else {
                this.toast.fire('Error', res.message, 'error');
              }
            });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getallnoselement();
        this.toast.fire('Cancelled', 'No any changed', 'error');
      }
    });
    //sweet alert end
  }
  noselmid: any;
  update(upd: any) {
    this.dispflag = false;
    this.viewportScroller.scrollToPosition([0, 0]);
    //console.log(upd);
    this.objnoselm.assessment_mode = upd.assessment_mode;
    this.objnoselm.sector_id = upd.sector_id;
    this.objnoselm.job_role_id = upd.job_role_id;
    this.objnoselm.nos_id = upd.nos_id;
    this.objnoselm.nos_element_name = upd.nos_element_name;
    this.noselmid = upd.id;
    this.flag = false;
    this.currentvalue = upd;
    this.drawer.open();
    this.detail = false;
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
          assessment_mode: this.objnoselm.assessment_mode.toString(), //All fields are required
          sector_id: this.objnoselm.sector_id.toString(),
          job_role_id: this.objnoselm.job_role_id.toString(),
          nos_id: this.objnoselm.nos_id.toString(),
          nos_element_name: this.objnoselm.nos_element_name.toString(),
          id: this.noselmid,
        };

        console.log(this.upobj + 'update query');
        this.noselemserv
          .updateNOS_ELEMETNS(this.upobj)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Updated!', res.message, 'success');
              this.getallnoselement();
              this.objnoselm.assessment_mode = '';
              this.objnoselm.sector_id = '';
              this.objnoselm.job_role_id = '';
              this.objnoselm.nos_id = '';
              this.objnoselm.nos_element_name = '';

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
  nosinfo: any;
  details(v: any) {
    this.dispflag = false;
    this.viewportScroller.scrollToPosition([0, 0]);
    this.noselemserv
      .detailsNOS_ELEMETNS({ id: v.id })
      .subscribe((res: APIResponse) => {
        this.nosinfo = res.data;
        this.objnoselm.assessment_mode = this.nosinfo.assessment_mode;
        this.objnoselm.sector_name = this.nosinfo.sector_name;
        this.objnoselm.job_role = this.nosinfo.job_role;
        this.objnoselm.nos_code = this.nosinfo.nos_code;
        this.objnoselm.index_id = this.nosinfo.index_id;
        this.objnoselm.nos_element_name = this.nosinfo.nos_element_name;
        this.noselmid = this.nosinfo.id;
      });
    // console.log(_cl);

    this.flag = false;
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
        console.log(this.dlt);
        this.noselemserv
          .deleteNOS_ELEMETNS(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Deleted!', res.message, 'success');
              this.getallnoselement();
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
