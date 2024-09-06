import { Component,OnInit,ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NgApexchartsModule } from "ng-apexcharts";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";
import { StdReportYearService } from '../../../core/services/report/std-report-year.service';
import { APIResponse } from '../../../core/models/API.Models';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  colors: any;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-std-report',
  standalone: true,
  imports: [MatCardModule,NgApexchartsModule,MatMenuModule],
  templateUrl: './std-report.component.html',
  styleUrl: './std-report.component.scss'
})
export class StdReportComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
    public chartOptions!: Partial<ChartOptions>;

    constructor(
      private stdrrptserv:StdReportYearService
    ) {

      this.bargrapgh();
      this.studentreport();
      //this.startTimer();
      }
      stdcount:any=[];
      months:any=[];
      ngOnInit(): void {


      }

      // stddata:any[]=[];
    studentreport()
    {

      this.stdrrptserv.student_year_wise_report().subscribe((res:APIResponse) => {
        res.data.forEach((item:any) => {

          this.stdcount.push(item.candidate_count);
          this.months.push(item.month);

        });

        console.log(this.stdcount);
        console.log(this.months);
      });


      this.chartOptions.series = [{
        name: "Student Count",
        data: this.stdcount
      }];
      this.chartOptions.xaxis = {
        categories: this.months
      };

    }
    bargrapgh()
    {
      this.chartOptions = {
        series: [],
        chart: {
            height: 312,
            type: "bar",
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "40%",
                distributed: true,
            },
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#757FEF"],
        xaxis: {
            categories: [],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: "#a9a9c8",
                    fontSize: "14px",
                },
            },
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: true,
                style: {
                    colors: "#a9a9c8",
                    fontSize: "14px",
                },
            }
        },
        grid: {
            show: true,
            borderColor: "#EDEFF5",
            strokeDashArray: 5,
        },
        legend: {
            offsetY: 5,
            show: false,
            position: "bottom",
            fontSize: "14px",
            horizontalAlign: "center",
            labels: {
                colors: '#5B5B98',
            },
        },
    };

    }
    totaltime!:any;
  startTimer() {
    this.totaltime = setInterval(() => {
      //this.capture();
      this.studentreport();
      // this.counter++;
      // console.log(this.counter)

    },1000);
  }

}
