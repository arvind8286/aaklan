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
  bulkquestion,
  country,
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
import { DecimalNumberDirective } from '../../../core/directive/decimal-number.directive';
import { BulkQuestAddService } from '../../../core/services/bulk-quest-add.service';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import * as XLSX from 'xlsx';
import { HttpHeaders } from '@angular/common/http';
import { StatusFilterPipe } from "../../../core/pipes/status-filter.pipe";

@Component({
  selector: 'app-question-bulk',
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
    NgxDropzoneModule,
    StatusFilterPipe
],
  templateUrl: './question-bulk.component.html',
  styleUrl: './question-bulk.component.scss',
})
export class QuestionBulkComponent {
  constructor(
    private secotorserv: SectorService,
    private jobroleserv: JobroleService,
    private noselemserv: NoselementService,
    private questserv: QuestService,
    private bulkquestServe: BulkQuestAddService
  ) {
    this.getQuestSETList();
    //this.getjobroleList();
   // this.getnoselementsList();
    this.getsectorList();
  }
 // sweetalert toster setting
 public toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});
//sweet alert setting end



  sectorlist: sector[] = [];
  jobroleList: jobrole[] = [];
  nosElementList: noselement[] = [];
  papersetList: queset[] = [];
  objbulquest: bulkquestion = new bulkquestion();

  filesdata: File[] = [];
  data: any;

  getsectorList() {
    this.secotorserv.getAllSECTORList().subscribe((res: APIResponse) => {
      this.sectorlist = res.data;
    });
  }
  objqset:any;
  getQuestSETList() {
    this.objqset=
   {
    //  'nos_id':this.objbulquest.nos_id,
     'job_role_id':this.objbulquest.job_role_id,
       'sector_id':this.objbulquest.sector_id
   }
    this.questserv.getAllQUESSET(this.objqset).subscribe((res: APIResponse) => {
      this.papersetList = res.data;
    });
  }
  objob:any;
  getalljobrole()
  {
   this.objob=
     {
       'sector_id':this.objbulquest.sector_id
     }
     //;

   //;
   this.jobroleserv.getAllJOB_ROLE(this.objob).subscribe((res: APIResponse) => {
      this.jobroleList = res.data;
    });
  }
  objnoselm:any;
  getallnoselement() {
   this.objnoselm=
   {
    //  'nos_id':this.objbulquest.nos_id,
     'job_role_id':this.objbulquest.job_role_id,
       'sector_id':this.objbulquest.sector_id
   }
   //;
   this.noselemserv.getAllNOS_ELEMETNS(this.objnoselm).subscribe((res: APIResponse) => {
      this.nosElementList = res.data;
    });
  }
  onSelect(event: NgxDropzoneChangeEvent) {
    this.filesdata = event.addedFiles;
    // this.filesdata.push(...event.addedFiles);
  }
  onRemove(event: any) {
    this.filesdata.splice(this.filesdata.indexOf(event), 1);
  }
  objupload: any;
  bulkAdd() {
    if (this.filesdata.length > 0) {
      const formData = new FormData();
      formData.append('files', this.filesdata[0], this.filesdata[0].name);
      formData.append('paper_set_id',this.objbulquest.paper_set_id);
      formData.append('sector_id',this.objbulquest.sector_id);
      formData.append('job_role_id',this.objbulquest.job_role_id);
      // formData.append('nos_element_id',this.objbulquest.nos_element_id);



      // console.log("form upload data:"+formData);


      this.bulkquestServe
        .AddBulkQUESTION(formData)
        .subscribe((res: APIResponse) => {
          if (res.status == 'success') {
            this.toast.fire('Add Question', res.message, 'success');

          } else {
            this.toast.fire('Error', res.message, 'error');


          }
        });
    } else {
      this.toast.fire('Error', 'No file selected', 'error');

    }
  }
  Downloadfile()
  {
    const link = document.createElement('a');
    link.href = 'assets/sample_file.xls'; // path to your Excel file
    link.download = 'sample_file.xls';
    link.click();
  }
}
