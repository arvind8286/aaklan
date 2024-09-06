import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StatusBarComponent } from "./status-bar/status-bar.component";
import { StdReportComponent } from "./std-report/std-report.component";
import { BatchDetailsComponent } from "./batch-details/batch-details.component";
import { BatchYearComponent } from "./batch-year/batch-year.component";
import { CalenderDetailsComponent } from "./calender-details/calender-details.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, StatusBarComponent, StdReportComponent, BatchDetailsComponent, BatchYearComponent, CalenderDetailsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
