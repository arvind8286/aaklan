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
  creteevidance,
  jobrole,
  nosdetails,
  noselement,
  pcdetails,
  queset,
  question,
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
import { SectorService } from '../../../core/services/sector.service';
import { JobroleService } from '../../../core/services/jobrole.service';

import {
  Editor,
  NgxEditorComponent,
  NgxEditorModule,
  Toolbar,
} from 'ngx-editor';
import {
  EditorChangeContent,
  EditorChangeSelection,
  QuillModule,
} from 'ngx-quill';
import Quill from 'quill';
import { NOS_DETAILSService } from '../../../core/services/nosdetails.service';
import { NoselementService } from '../../../core/services/noselement.service';
import { PcdetailService } from '../../../core/services/pcdetail.service';
import { QuestService } from '../../../core/services/quest.service';
import { QuestionpaperService } from '../../../core/services/questionpaper.service';
import { CreateEvidanceService } from '../../../core/services/create-evidance.service';
import { DecimalNumberDirective } from '../../../core/directive/decimal-number.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-create-evidance',
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
    NgxEditorModule,
    QuillModule,
    DecimalNumberDirective,
    MatTooltipModule
  ],
  templateUrl: './create-evidance.component.html',
  styleUrl: './create-evidance.component.scss',
})
export class CreateEvidanceComponent {




  constructor(
    private viewportScroller: ViewportScroller,
    private creteedvserv: CreateEvidanceService
  ) {
    this.getAllcreateevidanceList();
  }

  // sweetalert toster setting
  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  objcrtedv: creteevidance = new creteevidance();
  dispflag = false;

  flag = true;
  obj: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'status',
    'parent_category',
    'evidence_name',
    'batch_type',
    'min_images',
    'max_images',
    'min_videos',
    'max_videos',
    'video_duration',


  ];
  datasource!: MatTableDataSource<creteevidance>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  getAllcreateevidanceList() {
    this.creteedvserv
      .getAllCREATEEVIDANCEList()
      .subscribe((res: APIResponse) => {
        //this.dispdata =res.data;
        this.datasource = new MatTableDataSource<creteevidance>(res.data);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;

        console.log(this.datasource);
      });
  }

  oncreate() {
    this.obj = {
      parent_category: this.objcrtedv.parent_category, //Theory, Viva Video
      evidence_name: this.objcrtedv.evidence_name, //Viva Evidence, Theory Evidence
      evidence_description: this.objcrtedv.evidence_description, //maxlength 200
      batch_type: this.objcrtedv.batch_type, //Online,Offline
      min_images: this.objcrtedv.min_images.toString(),
      max_images: this.objcrtedv.max_images.toString(),
      min_videos: this.objcrtedv.min_videos.toString(),
      max_videos: this.objcrtedv.max_videos.toString(),
      video_duration: this.objcrtedv.video_duration.toString(),
    };
    console.log(this.obj);
    this.creteedvserv
      .addCREATEEVIDANCE(this.obj)
      .subscribe((res: APIResponse) => {
        if (res.status == 'success') {
          // alert(res.message);
          this.toast.fire('Add Evidence', res.message, 'success');
          this.getAllcreateevidanceList();
        } else {
          //alert(res.message);
          this.toast.fire('Error', res.message, 'error');
        }
      });
  }
  evdid: any;
  update(upd: any) {
    this.dispflag = false;
    this.viewportScroller.scrollToPosition([0, 0]);
    // console.log(_cl);
    this.objcrtedv.parent_category = upd.parent_category;
    this.objcrtedv.evidence_name = upd.evidence_name;
    this.objcrtedv.evidence_description = upd.evidence_description;
    this.objcrtedv.batch_type=upd.batch_type;
    this.objcrtedv.min_images = upd.min_images;
    this.objcrtedv.max_images = upd.max_images;
    this.objcrtedv.min_videos = upd.min_videos;
    this.objcrtedv.max_videos = upd.max_videos;
    this.objcrtedv.video_duration = upd.video_duration;

    this.evdid = upd.id;
    this.flag = false;
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
          id: this.evdid,
          parent_category: this.objcrtedv.parent_category, //Theory, Viva Video
          evidence_name: this.objcrtedv.evidence_name, //Viva Evidence, Theory Evidence
          evidence_description: this.objcrtedv.evidence_description, //maxlength 200
          batch_type: this.objcrtedv.batch_type, //Online,Offline
          min_images: this.objcrtedv.min_images,
          max_images: this.objcrtedv.max_images,
          min_videos: this.objcrtedv.min_videos,
          max_videos: this.objcrtedv.max_videos,
          video_duration: this.objcrtedv.video_duration,
        };

        console.log(this.upobj + 'update query');
        this.creteedvserv
          .updateCREATEEVIDANCE(this.upobj)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Updated!', res.message, 'success');
              this.getAllcreateevidanceList();
              this.objcrtedv.parent_category = '';
              this.objcrtedv.evidence_name = '';
              this.objcrtedv.evidence_description = '';
              this.objcrtedv.min_images = '';
              this.objcrtedv.max_images = '';
              this.objcrtedv.min_videos = '';
              this.objcrtedv.max_videos = '';
              this.objcrtedv.video_duration = '';

              this.flag = true;
            } else {
              this.toast.fire('Error', res.message, 'error');
              this.flag = false;
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
        this.creteedvserv
          .activateCREATEEVIDANCE(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              // alert(res.message);
              this.toast.fire('Active', res.message, 'success');
              sid.status = 'Active';
              this.getAllcreateevidanceList();
            } else {
              // alert(res.message);
              this.toast.fire('Error', res.message, 'error');
            }
          });
      } else {
        this.creteedvserv
          .deactivateCREATEEVIDANCE(this.dlt)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Deactivated', res.message, 'success');
              sid.status ='Deactivated';
              this.getAllcreateevidanceList();
            } else {
              this.toast.fire('Error', res.message, 'error');
            }
          });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      this.getAllcreateevidanceList();
      this.toast.fire('Cancelled', 'No any changed', 'error');
    }
  });
}
  //sweet alert end

  objdetail:any;
    detail:any;
details(v:any)
{

  this.viewportScroller.scrollToPosition([0, 0]);
  this.objdetail={
    id:v.id
  }
  this.creteedvserv.detailsCREATEEVIDANCE(this.objdetail).subscribe((res:APIResponse)=>{
    this.detail=res.data;
    // console.log(this.detailsjobrol+"details of "+this.detailsjobrol.job_role_short_name);
    this.objcrtedv.parent_category = this.detail.parent_category;
    this.objcrtedv.evidence_name = this.detail.evidence_name;
    this.objcrtedv.evidence_description = this.detail.evidence_description;
    this.objcrtedv.batch_type=this.detail.batch_type;
    this.objcrtedv.min_images = this.detail.min_images;
    this.objcrtedv.max_images = this.detail.max_images;
    this.objcrtedv.min_videos = this.detail.min_videos;
    this.objcrtedv.max_videos = this.detail.max_videos;
    this.objcrtedv.video_duration = this.detail.video_duration;
  this.dispflag=true;
  this.flag=true;
  });

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

      this.creteedvserv
        .deleteCREATEEVIDANCE(this.dlt)
        .subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            //alert(res.message);
            this.toast.fire('Record Deleted!', res.message, 'success');
            this.getAllcreateevidanceList();
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
