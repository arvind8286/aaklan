import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
import { APIResponse, country, jobrole, nosdetails, noselement, pcdetails, queset, question, sector } from '../../../core/models/API.Models';
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

import { Editor, NgxEditorComponent, NgxEditorModule, Toolbar } from 'ngx-editor';
import { EditorChangeContent, EditorChangeSelection, QuillModule } from 'ngx-quill';
import Quill from 'quill';
import { NOS_DETAILSService } from '../../../core/services/nosdetails.service';
import { NoselementService } from '../../../core/services/noselement.service';
import { PcdetailService } from '../../../core/services/pcdetail.service';
import { QuestService } from '../../../core/services/quest.service';
import { QuestionpaperService } from '../../../core/services/questionpaper.service';
import { InstructionService } from '../../../core/services/instruction.service';


@Component({
  selector: 'app-quest-intro',
  standalone: true,
  imports: [MatExpansionModule,
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
    NgFor,NgxEditorModule,QuillModule],
  templateUrl: './quest-intro.component.html',
  styleUrl: './quest-intro.component.scss'
})
export class QuestIntroComponent implements OnInit {
  constructor(
    private rout:ActivatedRoute,
    private backnav:Router,
    private instserv:InstructionService,

  ){
    this.questid = this.rout.snapshot.paramMap.get('id');
    this.featch_inst();
  }
  questid:any;
  html$ = '';
  ngOnInit(): void {
    this.editor = new Editor();



  }
  ngOnDestroy(): void {
    this.editor.destroy();
}

// sweetalert toster setting
public toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});
//end
  editor!:Editor;
  flag=true;
  instruction!:any;
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link','image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
];

get html(): string {
  return this.html$;
}
set html(html: string) {
  this.html$ = html;
  //this.fixTentative = html.replace(/<p><\/p>/ig, '<p><br><\/p>');
}
fixTentative = '';
dispflag=false;
objadd:any;
addinstruction()
{
  this.objadd=
  {
    "question_set_id":this.questid.toString(),
    "instruction":this.html$.toString()
  }
  //console.log(this.objadd);
  this.instserv.ADD_instruct(this.objadd).subscribe(res=>{
    if (res.status == 'success') {
      this.toast.fire('Add Instruction', res.message, 'success');
    } else {
      this.toast.fire('Error', res.message, 'error');
    }
  })
}
objfetch:any;
featch_inst()
{
  if(this.questid!='')
    {
  this.objfetch=
  {
    "question_set_id":this.questid.toString()
  }

  this.instserv.List_instruct(this.objfetch).subscribe(res=>{
    // if(res.status=='success')
    //   {
    // if(this.html$!=null)
    //   {
        this.html=res.data.instruction;
       // console.log(this.html);
        //this.editor.setContent();


    //   }
    // }
    //console.log(res.data);

  })
}
}
backtomain()
{
  this.backnav.navigateByUrl('/quesset');
}

}
