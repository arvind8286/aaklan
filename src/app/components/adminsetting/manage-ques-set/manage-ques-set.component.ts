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
import { DatePipe, NgFor, NgIf, ViewportScroller } from '@angular/common';
import { CountrydataService } from '../../../core/services/countrydata.service';
import { APIResponse, country, jobrole, queset, sector } from '../../../core/models/API.Models';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { JobroleService } from '../../../core/services/jobrole.service';
import { SectorService } from '../../../core/services/sector.service';
import { QuestService } from '../../../core/services/quest.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, Router } from '@angular/router';
import { StatusFilterPipe } from "../../../core/pipes/status-filter.pipe";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD MM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-manage-ques-set',
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
    MatDatepickerModule,
    MatNativeDateModule,
    NgFor,
    MatTooltipModule,
    StatusFilterPipe,
    MatSidenavModule
],
  templateUrl: './manage-ques-set.component.html',
  styleUrl: './manage-ques-set.component.scss',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },DatePipe],
})


export class ManageQuesSetComponent implements AfterViewInit, OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
    private jobroleserv:JobroleService,
    private sectorse:SectorService,
    private questserv:QuestService,
    private intro:Router,
    private datePipe:DatePipe

  ) {
    this.objquest.assessment_mode='Online';

    this.getAllsector();
    this.getalljobrole();
    this.getallquestset();


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
    this.objquest.assessment_mode="Online";
              this.objquest.sector_id="";
              this.objquest.job_role_id="";
              this.objquest.paper_set_name ="";
              this.objquest.assessment_type="";
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
  objquest:queset=new queset();


dataform:Date=new Date();
flag=true;
  obj:any;
  dispflag=false;
  detailsjobrol:any;//jobrole;//=new jobrole();
  upobj: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'status',
    'assessment_type',
    'paper_set_name',
   'valid_till',
   'assessment_mode',
   'sector_name',
   'job_role_name',
 ];
  datasource!: MatTableDataSource<queset>;
  applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.datasource.filter = filterValue.trim().toLowerCase();
 }



 getAllsector()
 {

 this.sectorse.getAllSECTORList().subscribe((res: APIResponse) => {

  this.secotorList=res.data;
  if(this.secotorList.length===1)
  {
    this.getalljobrole();
  }

  //console.log(this.secotorList);
});
 }
 objob:any;
 getalljobrole()
 {
  this.objob=
    {
      'sector_id':this.objquest.sector_id
    }
    //;

  //;
  this.jobroleserv.getAllJOB_ROLE(this.objob).subscribe((res: APIResponse) => {

    this.jobroleList=res.data;
    if(this.jobroleList.length===1)
    {
      this.objquest.job_role_id=this.jobroleList[0].id;
    }
    //console.log(this.datasource);
  });
 }

//  date(dt:any)
//  {
//   debugger;
//   this.objquest.valid_till=dt;
//   console.log(dt);
//  }

formatDate(dateString: string): string | null {
  const formattedDate = this.datePipe.transform(dateString, 'yyyy-MM-dd');
  return formattedDate;
}
 oncreate()
{

  this.obj=
  {
    "assessment_mode":this.objquest.assessment_mode, //All fields are required
    "sector_id":this.objquest.sector_id,
    "job_role_id":this.objquest.job_role_id,
    "paper_set_name":this.objquest.paper_set_name,
    "assessment_type":this.objquest.assessment_type,
    "valid_till":this.formatDate(this.objquest.valid_till),
  }
console.log(this.obj);
//debugger
    this.questserv.addQUESSET(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add Question Set', res.message, 'success');
        this.objquest.paper_set_name ="";
        this.objquest.assessment_type="";
        this.getallquestset();
      } else {
        //alert(res.message);
        this.toast.fire('Error', res.message, 'error');
      }
    });
}

getallquestset()
{
  this.questserv.getAllQUESSETList().subscribe((res: APIResponse) => {
    //this.dispdata =res.data;
    this.datasource = new MatTableDataSource<queset>(res.data);
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
          this.questserv
            .activateQUESSET(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                // alert(res.message);
                this.toast.fire('Active', res.message, 'success');
                sid.status = 'Active';
                this.getallquestset();
              } else {
                // alert(res.message);
                this.toast.fire('Error', res.message, 'error');
              }
            });
        } else {
          this.questserv
            .deactivateQUESSET(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                //alert(res.message);
                this.toast.fire('Deactivated', res.message, 'success');
                sid.status ='Deactivated';
                this.getallquestset();
              } else {
                this.toast.fire('Error', res.message, 'error');
              }
            });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getallquestset();
        this.toast.fire('Cancelled', 'No any changed', 'error');
      }
    });
    //sweet alert end

}
quesid:any;
update(upd:any)
{
  this.dispflag=false;
  this.viewportScroller.scrollToPosition([0, 0]);
  // console.log(_cl);
  this.objquest.assessment_mode=upd.assessment_mode;
  this.objquest.sector_id=upd.sector_id;
  this.objquest.job_role_id=upd.job_role_id;
  this.objquest.paper_set_name =upd.paper_set_name;
  this.objquest.assessment_type=upd.assessment_type;
  this.objquest.valid_till=upd.valid_till;
  this.quesid=upd.id;
  this.flag = false;
  this.detail = false;
  this.currentvalue = upd;

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

            "assessment_mode":this.objquest.assessment_mode.toString(), //All fields are required
            "sector_id":this.objquest.sector_id.toString(),
            "job_role_id":this.objquest.job_role_id.toString(),
            "paper_set_name":this.objquest.paper_set_name.toString(),
            "assessment_type":this.objquest.assessment_type.toString(),
            "valid_till":this.objquest.valid_till.toString(),
            "id":this.quesid,
             };

        console.log(this.upobj+"update query");
        this.questserv
          .updateQUESSET(this.upobj)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Updated!', res.message, 'success');
              this.getallquestset();


              // this.flag=true;

            } else {
              this.toast.fire('Error', res.message, 'error');
              // this.flag = false;
            }
          });
        //alert("record updated");
       // this.flag = true;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.flag = false;
        this.toast.fire('Cancelled', 'update action is cancelled', 'error');
      }
    });
    //sweet alert end
  }
  details(v:any)
{
  this.dispflag=true;
  this.viewportScroller.scrollToPosition([0, 0]);
  // console.log(_cl);
  this.objquest.assessment_mode=v.assessment_mode;
  this.objquest.sector_name=v.sector_name;
  this.objquest.job_role_name=v.job_role_name;
  this.objquest.paper_set_name =v.paper_set_name;
  this.objquest.assessment_type=v.assessment_type;
  this.objquest.valid_till=v.valid_till;
  this.objquest.index_id=v.index_id;
  this.quesid=v.id;
  this.flag=false;
  this.detail = true;
  this.currentvalue = v;

  this.drawer.open();

}
setintro(id:any)
{
  this.intro.navigateByUrl(`questintro/${id}`);
}

}
