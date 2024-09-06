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
import { CommonModule, NgFor, NgIf, ViewportScroller } from '@angular/common';
import { CountrydataService } from '../../../core/services/countrydata.service';
import {
  APIResponse,
  country,
  examstdlist,
  jobrole,
  nosdetails,
  noselement,
  pcdetails,
  sector,
  studentnoswiseRPT,
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExamstudentListService } from '../../../core/services/Assessor/examstudent-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NosWiseService } from '../../../core/services/result/nos-wise.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-nos-wise-report',
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
  ],
  templateUrl: './nos-wise-report.component.html',
  styleUrl: './nos-wise-report.component.scss',
})
export class NosWiseReportComponent {

  batchid: any;
  sid: any;
  dataexcel:any[]=[];
  constructor(
    private getdata:ActivatedRoute,
    private backbtn:Router,
    private stdnosrptserv:NosWiseService
  ){
    this.batchid = this.getdata.snapshot.paramMap.get('bid');
    this.sid = this.getdata.snapshot.paramMap.get('sid');
    console.log("bid:"+this.batchid+",sid:"+this.sid);
    this.getreportnoswise();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'question_no',
    'question',
    'answer',
    'assessment_type',
    'question_type',
    'student_answer',
    'total_marks',
    'marks_obtain',
    'difficulty_level',
    'option1',
    'option2',
    'option3',
    'option4',
    'option5',
    'option6',
  ];
  datasource!: MatTableDataSource<studentnoswiseRPT>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  backtostudentreport() {
    this.backbtn.navigateByUrl('studentwiseReport');
  }
  objnos:any;
 objstdnos:studentnoswiseRPT=new studentnoswiseRPT();
getreportnoswise()
{
  //debugger
  this.objnos={
    'batch_id':this.batchid,
    'student_id':this.sid,

  }

  this.stdnosrptserv.student_NOS_wise_result(this.objnos).subscribe((res:APIResponse)=>{


     this.datasource=new MatTableDataSource<studentnoswiseRPT>(res.data.question);
    // this.datasource=res.data;
    this.dataexcel=res.data.question;
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
    console.log(this.datasource);
  })
}
filename='studentreport.xlsx';

exportdata() {
  const ws:XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataexcel);
  const wb:XLSX.WorkBook=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,'Sheet1')
  XLSX.writeFile(wb,this.filename);

}
}
