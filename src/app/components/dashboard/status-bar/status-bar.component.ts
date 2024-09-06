import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { APIResponse, statusbar } from '../../../core/models/API.Models';
import { StatusBarService } from '../../../core/services/report/status-bar.service';


@Component({
  selector: 'app-status-bar',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './status-bar.component.html',
  styleUrl: './status-bar.component.scss',
})
export class StatusBarComponent {
  constructor(
    private dashborad_service:StatusBarService,


  ) {
    this.totalrecord();
  }


 status:statusbar=new statusbar();
  totalrecord() {

    this.dashborad_service.Dashboard_report().subscribe((res:APIResponse)=>{
      this.status=res.data;

      this.status.assessors=res.data[0].assessors;
      this.status.batchCount=res.data[0].batchCount;
      this.status.finishedExams=res.data[0].finishedExams;
      this.status.questions=res.data[0].questions;
      this.status.sectors=res.data[0].sectors;
      this.status.students=res.data[0].students;
      this.status.trainingPartners=res.data[0].trainingPartners;
    })

    // console.log(this.totalsector);
  }
}
