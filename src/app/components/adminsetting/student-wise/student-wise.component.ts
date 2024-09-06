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
  batch,
  bulkquestion,
  country,
  jobrole,
  nosdetails,
  noselement,
  pcdetails,
  queset,
  question,
  sector,
  studentreport,
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
import { BatchService } from '../../../core/services/batch.service';
import { ResultStudentWiseService } from '../../../core/services/result/result-student-wise.service';
import { CapitalizePipe } from "../../../core/pipes/capitalize.pipe";
import { StatusFilterPipe } from "../../../core/pipes/status-filter.pipe";
import { Data, Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-student-wise',
  standalone: true
  ,imports: [
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
    CapitalizePipe,
    StatusFilterPipe,
    MatMenuModule,
    MatTooltipModule
],
  templateUrl: './student-wise.component.html',
  styleUrl: './student-wise.component.scss'
})
export class StudentWiseComponent implements OnInit {

  datasource!: MatTableDataSource<any>;
  resultdata:any[]=[];
  dataexcel:any[]=[];
  constructor(
    private batchserv:BatchService,
    private resutserv:ResultStudentWiseService,
    private nosrout:Router

  )
  {
    // const data:studentreport[]=[];
    // this.datasource=new MatTableDataSource(data);


    this.batchlistdisp();
    // this.reulstwisedisp();


  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'name', 'batch_name', 'enrollment_number','theory','viva','practical',
    'no_of_questions', 'total_marks', 'marks_obtain',

  ];

  // sweetalert toster setting
public toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});
selectedvalue:string="";
  batchlist:batch[]=[];
  objbatch:batch=new batch();
  batchlistdisp()
  {
    this.batchserv.getAllBATCHList().subscribe((res:APIResponse)=>{
    this.batchlist=res.data;

    });
  }
ngOnInit(): void {
  this.selectedvalue = localStorage.getItem('selectedValue')||'';
}


objid:any;
  reulstwisedisp()
  {
    const selectedvalue=this.objbatch.id;
    localStorage.setItem('selectedValue', this.objbatch.id);
    console.log("getlocalvalue="+this.selectedvalue);
    this.objid=
    {
      // "batch_id":"MW8wazJxVHZPN0tCL0VkTDcwaXQzdz09"
       "batch_id":this.objbatch.id
    }
    console.log(this.objid);
    // localStorage.setItem('btchid',this.objid);
    // this.objbatch.id= localStorage.getItem('btchid')
    this.resutserv.student_wise_result(this.objid).subscribe((res:any)=>{
      // if(res.status=='success')
      // {
      // this.datasource = new MatTableDataSource<any>(res.data);
      // this.datasource.paginator = this.paginator;
      // this.datasource.sort = this.sort;
      // console.log(this.datasource);
      this.resultdata=res.data;
      //this.dataexcel=res.data;

      // }
      // else
      // {
      //   this.toast.fire('Error', res.message, 'error');
      // }
    })
  }
  noswisereport(_bid: any,_sid: any) {
    // debugger
    // this.nosrout.navigate(['noswisereport'], {
    //   queryParams: { bid: _bid, sid: _sid}
    // });
    this.nosrout.navigateByUrl(`noswisereport/${_sid}/${_bid}`);
    }
    filename="student_question_wise_report.xlsx";
    exportdata() {
      const ws:XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.resultdata);
      const wb:XLSX.WorkBook=XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,ws,'Sheet1')
      XLSX.writeFile(wb,this.filename);

    }
    get_evidanve(_bid: any,_sid: any)
    {
      this.nosrout.navigateByUrl(`getevidance/${_sid}/${_bid}`);
    }
    get_NOS_REPORT(_bid: any,_sid: any)
    {
      this.nosrout.navigateByUrl(`nosreportdata/${_sid}/${_bid}`);
    }
}
