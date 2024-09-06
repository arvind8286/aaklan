import { Component, OnInit, ViewChild } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexChart,
    ApexStroke,
    ApexTooltip,
    ApexDataLabels,
    ApexLegend,
    NgApexchartsModule,
} from "ng-apexcharts";
import { StdReportYearService } from "../../../core/services/report/std-report-year.service";
import { APIResponse } from "../../../core/models/API.Models";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    stroke: ApexStroke;
    chart: ApexChart;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
    labels: any;
    legend: ApexLegend;
    colors: any;
};

@Component({
  selector: 'app-batch-details',
  standalone: true,
  imports: [MatCardModule,MatMenuModule,NgApexchartsModule],
  templateUrl: './batch-details.component.html',
  styleUrl: './batch-details.component.scss'
})
export class BatchDetailsComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor(
      private stdrptserve:StdReportYearService
    ) {
      this.counter=1;
        this.chartOptions = {
            // series: [59.5, 25, 15.5],
            series: this.stdcount,
            chart: {
                height: 315,
                type: "pie"
            },
            stroke: {
                width: 0,
                show: true
            },
            colors: ["#757fef", "#ee368c", "#2db6f5"],
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '14px',
                },
                dropShadow: {
                    enabled: false
                }
            },
            tooltip: {
                style: {
                    fontSize: '14px',
                },
                y: {
                    formatter: function(val:any) {
                        return val + "%";
                    }
                }
            },
            legend: {
                offsetY: 5,
                position: "bottom",
                fontSize: "14px",
                labels: {
                    colors: '#5B5B98',
                },
            },
            // labels: ["Courses Done", "On Progress", "To Do"]
            labels: this.months
        };
        this.studentreport();
       // this.startTimer();
    }
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      // this.studentreport();
    }
    stdcount:any=[];
    months:any=[];
    studentreport()
    {
      this.stdrptserve.student_year_wise_report().subscribe((res:APIResponse) => {
        res.data.forEach((item:any) => {

          this.stdcount.push(item.candidate_count);
          this.months.push(item.month);

        });

        // console.log(this.stdcount);
        // console.log(this.months);
      });
    }

    //timer

    totaltime!:any;
    counter!:number;
startTimer() {
  this.totaltime = setInterval(() => {
    //this.capture();
    this.studentreport();
    // this.counter++;
    // console.log(this.counter)

  },1000); // 1000 milliseconds = 1 second
}

}
