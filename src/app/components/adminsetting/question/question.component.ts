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
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { StatusFilterPipe } from '../../../core/pipes/status-filter.pipe';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-question',
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

    MatIcon,
    MatIconModule,
    MatButtonModule,
    NgFor,
    NgxEditorModule,
    QuillModule,
    DecimalNumberDirective,
    MatTooltipModule,
    StatusFilterPipe,
    MatSidenavModule,

  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  constructor(
    private viewportScroller: ViewportScroller,
    private secotorserv: SectorService,
    private jobroleserv: JobroleService,
    private nosserv: NOS_DETAILSService,
    private noselemserv: NoselementService,
    private pcdetailsserv: PcdetailService,
    private questserv: QuestService,
    private questionserv: QuestionpaperService,
    private navurl: Router
  ) {
    this.objquest.domain_name='Online';


    //this.getPCdetailsList();
    this.getQuestSETList();
    //this.getalljobrole();
   // this.getallnosdetails();
    //this.getallnoselement();
    this.getsectorList();
    this.getAllQuestionList();
  }

  //editorContent:string='';
  editor!: Editor;
  editor1!: Editor;
  editor2!: Editor;
  editor3!: Editor;
  editor4!: Editor;
  editor5!: Editor;
  editor6!: Editor;

  html!: '';
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];

  ngOnInit(): void {
    // this.objquest.question_type='mcq';
    this.objquest.domain_name='Online';
    this.qtype='mcq';
    // this.qtype='fill_in_the_blank';

    this.editor = new Editor();
    this.editor1 = new Editor();
    this.editor2 = new Editor();
    this.editor3 = new Editor();
    this.editor4 = new Editor();
    this.editor5 = new Editor();
    this.editor6 = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    // this.editor.destroy();
  }

  // sweetalert toster setting
  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });
  qtype:any;

  currentvalue: any;
  detail = false;

  @ViewChild('drawer') drawer!: MatSidenav;

  openDrawer() {
    if (this.currentvalue != null) {
      this.objquest.domain_name = 'Online';
      this.objquest.sector_id = '';
      this.objquest.job_role_id = '';
      this.objquest.nos_id = '';
      this.objquest.nos_element_id = '';
      this.objquest.theory_or_viva = '';
      this.objquest.paper_set_id = '';
      this.objquest.question_type = '';
      this.objquest.total_marks = '';
      this.objquest.difficulty_level = '';
      this.objquest.pc_details_id = '';
      this.objquest.question = '';
      this.objquest.option_a = '';
      this.objquest.option_b = '';
      this.objquest.option_c = '';
      this.objquest.option_d = '';
      this.objquest.option_e = '';
      this.objquest.option_f = '';
      this.objquest.answer = '';
      this.flag = true;
      this.detail = false;
      this.dispflag = false;
    }

    this.drawer.open();
  }
  close() {
    this.drawer.close();
  }
  blurred = false;
  focused = false;
  objquest: question = new question();
  dispflag = false;
  secotorList: sector[] = [];
  jobroleList: jobrole[] = [];
  noslist: nosdetails[] = [];
  noselememt: noselement[] = [];
  questList: queset[] = [];
  pcdetailsList: pcdetails[] = [];
  flag = true;
  obj: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'index_id',
    'status',
    'domain_name',
    'sector_name',
    'job_role_name',
    'nos_element_name',
    'paper_set_name',
    'question',
    'question_type',
    'difficulty_level',
  ];
  datasource!: MatTableDataSource<question>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  getsectorList() {
    this.secotorserv.getAllSECTORList().subscribe((res: APIResponse) => {
      this.secotorList = res.data;
      // if (this.secotorList.length === 1) {
      //   this.objquest.sector_id=this.secotorList[0].id;
      //  // this.getalljobrole();
      // }
    });
  }
  objob: any;
  getalljobrole() {
    this.objob = {
      sector_id: this.objquest.sector_id,
    };
    //;

    //;
    this.jobroleserv
      .getAllJOB_ROLE(this.objob)
      .subscribe((res: APIResponse) => {
        this.jobroleList = res.data;
        if (this.jobroleList.length === 1) {
         // this.objquest.job_role_id=this.jobroleList[0].id;
          //this.getallnosdetails();
        }
      });
  }
  objnos: any;
  getallnosdetails() {
    this.objnos = {
      job_role_id: this.objquest.job_role_id,
      sector_id: this.objquest.sector_id,
    };
    //;
    this.nosserv
      .getAllNOS_DETAILS(this.objnos)
      .subscribe((res: APIResponse) => {
        this.noslist = res.data;
        // if (this.noslist.length === 1) {
          //this.objquest.nos_id=this.noslist[0].id;
         // this.getallnoselement();
        //}
      });
  }
  objnoselm: any;
  getallnoselement() {
    this.objnoselm = {
      nos_id: this.objquest.nos_id,
      job_role_id: this.objquest.job_role_id,
      sector_id: this.objquest.sector_id,
    };
    //;
    this.noselemserv
      .getAllNOS_ELEMETNS(this.objnoselm)
      .subscribe((res: APIResponse) => {
        this.noselememt = res.data;
        // if (this.noselememt.length === 1) {
        //   this.objquest.nos_element_id=this.noselememt[0].id;
        //   this.getPCdetailsList();
        // }
      });
  }
  objpcfil: any;
  getPCdetailsList() {
    this.objpcfil = {
      nos_id: this.objquest.nos_id,
      job_role_id: this.objquest.job_role_id,
      sector_id: this.objquest.sector_id,
      nos_element_id: this.objquest.nos_element_id,
      perpage: 100,
      page: 1,
    };
    this.pcdetailsserv
      .getAllPCDETAILS(this.objpcfil)
      .subscribe((res: APIResponse) => {
        // this.pcdetailsserv.getAllPCDETAILSList().subscribe((res: APIResponse) => {
        this.pcdetailsList = res.data;
        // if (this.pcdetailsList.length === 1) {
        //   this.objquest.job_role_id = this.jobroleList[0].id;
        //   this.getAllQuestionList();
        // }
       // console.log(this.pcdetailsList);
      });
  }
qestion_type()
{
  console.log("question type==:"+this.objquest.question_type);
 // debugger
  if(this.objquest.question_type.toLowerCase()==='mcq')
  {
    this.qtype='mcq';
  }
   if(this.objquest.question_type.toLowerCase()==='true_false')
    {
      this.qtype='true_false';

        this.objquest.option_a="True";
        this.objquest.option_b="False";

    }
    if(this.objquest.question_type.toLowerCase()==='fill_in_the_blank')
      {
        this.qtype='fill_in_the_blank';
      }
      if(this.objquest.question_type.toLowerCase()==='one_word')
        {
          this.qtype='one_word';
        }
}


  objq: any;

  getQuestSETList() {
    this.objq = {
      job_role_id: this.objquest.job_role_id,
      sector_id: this.objquest.sector_id,
    };
    this.questserv.getAllQUESSET(this.objq).subscribe((res: APIResponse) => {
      this.questList = res.data;
      //this.objquest.theory_or_viva=this.questList[0].assessment_type;
    });
  }
  oncreate() {
    if(this.objquest.nos_element_id==null||this.objquest.pc_details_id==null||this.objquest.option_e==null||this.objquest.option_f==null)
    {
      this.objquest.nos_element_id="";
      this.objquest.pc_details_id="";
      this.objquest.option_e="";
      this.objquest.option_f="";
    }

    this.obj = {
      "domain_name": this.objquest.domain_name, //Online,Offline // required
      "sector_id": this.objquest.sector_id, // required
      "job_role_id": this.objquest.job_role_id, // required
      "nos_id": this.objquest.nos_id, // required
      "nos_element_id": this.objquest.nos_element_id, // required
      "theory_or_viva": this.objquest.theory_or_viva, // theory, viva, practical
      "paper_set_id": this.objquest.paper_set_id, // according to job_role_id and assesment mode(or domain_name)
      "question_type": this.objquest.question_type,
      "total_marks": this.objquest.total_marks,
      "difficulty_level": this.objquest.difficulty_level, // EASY, MEDIUM, HARD
      "pc_details_id": this.objquest.pc_details_id,
      "question": this.objquest.question,
      "option_a": this.objquest.option_a, // optional for theory
      "option_b": this.objquest.option_b, // optional for theory
      "option_c": this.objquest.option_c, // optional for theory
      "option_d": this.objquest.option_d, // optional for theory
      "option_e": this.objquest.option_e, // optional // optional for theory
      "option_f": this.objquest.option_f, // optional // optional for theory
      "answer": this.objquest.answer, // a, b, c, d, e, f
    };
    console.log(this.obj);
    this.questionserv.addQUESTION(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add Question', res.message, 'success');

        this.objquest.question = '';
        if(this.objquest.question_type.toLowerCase()!='true_false')
          {
        this.objquest.option_a = '';
        this.objquest.option_b = '';
          }
          this.objquest.sector_id = '';
          this.objquest.job_role_id = '';
          this.objquest.nos_id = '';
          this.objquest.nos_element_id = '';
          this.objquest.theory_or_viva = '';
          this.objquest.paper_set_id = '';
          this.objquest.question_type = '';
          this.objquest.total_marks = '';
          this.objquest.difficulty_level = '';
          this.objquest.pc_details_id = '';
          this.objquest.question = '';

          this.objquest.option_c = '';
          this.objquest.option_d = '';
          this.objquest.option_e = '';
          this.objquest.option_f = '';
          this.objquest.answer = '';
        this.getAllQuestionList();
      } else {
        //alert(res.message);
        this.toast.fire('Error', res.message, 'error');
      }
    });
  }
  currentPage: number = 1;
  pageSize: number = 100;
  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllQuestionList();
  }
  getAllQuestionList() {
    this.questionserv
      .getAllQuestion_paper_pagewise(this.currentPage, this.pageSize)
      .subscribe((res: APIResponse) => {
        //this.dispdata =res.data;
        this.datasource = new MatTableDataSource<question>(res.data);
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
          this.questionserv
            .activateQUESTION(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                // alert(res.message);
                this.toast.fire('Active', res.message, 'success');
                sid.status = 'Active';
                this.getAllQuestionList();
              } else {
                // alert(res.message);
                this.toast.fire('Error', res.message, 'error');
              }
            });
        } else {
          this.questionserv
            .deactivateQUESTION(this.dlt)
            .subscribe((res: APIResponse) => {
              if (res.status == 'success') {
                //alert(res.message);
                this.toast.fire('Deactivated', res.message, 'success');
                sid.status = 'Deactivated';
                this.getAllQuestionList();
              } else {
                this.toast.fire('Error', res.message, 'error');
              }
            });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getAllQuestionList();

        this.toast.fire('Cancelled', 'No any changed', 'error');
      }
    });
  }
  //sweet alert end
  qsid: any;
  qdetail:any;
  update(upd: any) {
    this.dispflag = false;
    this.viewportScroller.scrollToPosition([0, 0]);
    this.questionserv.detailsQUESTION({'id':upd.id}).subscribe((res:APIResponse)=>{
      if (res.status == 'success') {
        this.qdetail=res.data;
        // console.log("details="+this.qdetail.job_role_id);
        // console.log("DDdetails="+this.objquest.job_role_id);
        this.qtype=this.qdetail.question_type.toLowerCase();
        //console.log("questiontype="+this.qtype);

    this.objquest.domain_name = "Online";//this.qdetail.domain_name;
    this.objquest.sector_id = this.qdetail.sector_id;
    this.objquest.job_role_id = this.qdetail.job_role_id;
    this.objquest.nos_id = this.qdetail.nos_id;
    this.objquest.nos_element_id = this.qdetail.nos_element_id;
    this.objquest.theory_or_viva = this.qdetail.theory_or_viva;
    this.objquest.paper_set_id = this.qdetail.paper_set_id;
    this.objquest.question_type = this.qdetail.question_type.toLowerCase();
    this.objquest.total_marks = this.qdetail.total_marks;
    this.objquest.difficulty_level = this.qdetail.difficulty_level;
    this.objquest.pc_details_id = this.qdetail.pc_details_id;
    this.objquest.question = this.qdetail.question;
    this.objquest.option_a = this.qdetail.option_a;
    this.objquest.option_b = this.qdetail.option_b;
    this.objquest.option_c = this.qdetail.option_c;
    this.objquest.option_d = this.qdetail.option_d;
    this.objquest.option_e = this.qdetail.option_e;
    this.objquest.option_f = this.qdetail.option_f;
     this.objquest.answer = this.qdetail.answer;
    // this.qtype=this.qdetail.qestion_type;
            } else {
              this.toast.fire('Error', res.message, 'error');
              // this.flag = false;
            }



    })
    // console.log(_cl);
    //this.qtype=this.qdetail.qestion_type;
    this.qsid = upd.id;
    this.flag = false;
    this.dispflag = false;
    this.detail = false;
    this.currentvalue = upd;

    this.drawer.open();
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
          id: this.qsid.toString(),
          domain_name: this.objquest.domain_name.toString(), //Online,Offline // required
          sector_id: this.objquest.sector_id.toString(), // required
          job_role_id: this.objquest.job_role_id.toString(), // required
          nos_id: this.objquest.nos_id, // required
          nos_element_id: this.objquest.nos_element_id, // required
          theory_or_viva: this.objquest.theory_or_viva.toString(), // theory, viva, practical
          paper_set_id: this.objquest.paper_set_id.toString(), // according to job_role_id and assesment mode(or domain_name)
          question_type: this.objquest.question_type.toString(),
          total_marks: this.objquest.total_marks.toString(),
          difficulty_level: this.objquest.difficulty_level.toString(), // EASY, MEDIUM, HARD
          pc_details_id: this.objquest.pc_details_id,
          question: this.objquest.question.toString(),
          option_a: this.objquest.option_a.toString(), // optional for theory
          option_b: this.objquest.option_b.toString(), // optional for theory
          option_c: this.objquest.option_c.toString(), // optional for theory
          option_d: this.objquest.option_d.toString(), // optional for theory
          option_e: this.objquest.option_e.toString(), // optional // optional for theory
          option_f: this.objquest.option_f.toString(), // optional // optional for theory
          answer: this.objquest.answer.toString(), // a, b, c, d, e, f // optional for theory
        };

        console.log(this.upobj + 'update query');
        this.questionserv
          .updateQUESTION(this.upobj)
          .subscribe((res: APIResponse) => {
            if (res.status == 'success') {
              //alert(res.message);
              this.toast.fire('Record Updated!', res.message, 'success');
              this.getAllQuestionList();

              // this.flag=true;
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

  bulkupload() {
    this.navurl.navigateByUrl('/bulkquestionUpload');
  }

  objdetail: any;
  detailsquest: any;
  objquestion:any;
  details(v: any) {
    this.dispflag = true;
    this.viewportScroller.scrollToPosition([0, 0]);
    this.questionserv.detailsQUESTION({"id":v.id}).subscribe((res:APIResponse)=>{
      this.objquestion=res.data;
      this.objquest.domain_name = this.objquestion.domain_name;
      this.objquest.sector_name = this.objquestion.sector_name;
      this.objquest.job_role_name = this.objquestion.job_role_name;
      this.objquest.nos_code = this.objquestion.nos_code;
      this.objquest.nos_element_name = this.objquestion.nos_element_name;
      this.objquest.theory_or_viva = this.objquestion.theory_or_viva;
      this.objquest.paper_set_name = this.objquestion.paper_set_id;
      this.objquest.question_type = this.objquestion.question_type;
      this.objquest.total_marks = this.objquestion.total_marks;
      this.objquest.difficulty_level = this.objquestion.difficulty_level;
      this.objquest.pc_details_id = this.objquestion.pc_details_id;
      this.objquest.question = this.objquestion.question;
      this.objquest.option_a = this.objquestion.option_a;
      this.objquest.option_b = this.objquestion.option_b;
      this.objquest.option_c = this.objquestion.option_c;
      this.objquest.option_d = this.objquestion.option_d;
      this.objquest.option_e = this.objquestion.option_e;
      this.objquest.option_f = this.objquestion.option_f;
      this.objquest.index_id = this.objquestion.index_id;
      this.objquest.answer = this.objquestion.answer;

      this.qsid = this.objquestion.id;
    });
    // console.log(_cl);

    this.flag = false;
    this.detail = true;
    this.currentvalue = v;

    this.drawer.open();


    // this.viewportScroller.scrollToPosition([0, 0]);
    // this.objdetail={
    //   id:v.id
    // }
    // this.questionserv.detailsQUESTION(this.objdetail).subscribe((res:APIResponse)=>{
    //   this.detailsquest=res.data;
    //   // console.log(this.detailsjobrol+"details of "+this.detailsjobrol.job_role_short_name);
    //   this.objquest.domain_name=this.detailsquest.domain_name;
    //   this.objquest.sector_id=this.detailsquest.sector_id;
    //   this.objquest.job_role_id=this.detailsquest.job_role_id;
    //   this.objquest.nos_id=this.detailsquest.nos_id;
    //   this.objquest.nos_element_id=this.detailsquest.nos_element_id;
    //   this.objquest.theory_or_viva=this.detailsquest.theory_or_viva;
    //   this.objquest.paper_set_id=this.detailsquest.paper_set_id;
    //   this.objquest.question_type=this.detailsquest.question_type;
    //   this.objquest.total_marks=this.detailsquest.total_marks;
    //   this.objquest.difficulty_level=this.detailsquest.difficulty_level;
    //   this.objquest.pc_details_id=this.detailsquest.pc_details_id;
    //   this.objquest.question=this.detailsquest.question;
    //   this.objquest.option_a=this.detailsquest.option_a;
    //   this.objquest.option_b=this.detailsquest.option_b;
    //   this.objquest.option_c=this.detailsquest.option_c;
    //   this.objquest.option_d=this.detailsquest.option_d;
    //   this.objquest.option_e=this.detailsquest.option_e;
    //   this.objquest.option_f=this.detailsquest.option_f;
    //   this.objquest.answer=this.detailsquest.answer;

    // this.dispflag=true;
    // this.flag=true;
    //});
  }

  // changedEditor(event: EditorChangeContent | EditorChangeSelection) {
  // // console.log(event.editor.getText(1));
  // }

  // focus($event:any) {
  //     this.focused = true
  //     this.blurred = false
  // }

  // blur($event:any) {
  //     this.focused = false
  //     this.blurred = true
  // }
  // btn() {
  //   //alert(_t14);

  //   this.editorContent='<img src="/assets/img/logo.png"/>';
  //   //console.log(this.editorContent);
  //   }
}
