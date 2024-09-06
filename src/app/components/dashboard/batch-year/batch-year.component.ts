import { Component, ViewChild } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";

import {
    ApexNonAxisChartSeries,
    ApexTooltip,
    ApexLegend,
    ApexStroke,
    ApexChart
} from "ng-apexcharts";
import { BatchReportYearService } from "../../../core/services/report/batch-report-year.service";
import { APIResponse } from "../../../core/models/API.Models";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    labels: any;
    colors: any;
};


@Component({
  selector: 'app-batch-year',
  standalone: true,
  imports: [MatCardModule,MatMenuModule,NgApexchartsModule],

  templateUrl: './batch-year.component.html',
  styleUrl: './batch-year.component.scss'
})
export class BatchYearComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  batchcount:any=[];
  months:any=[];
  constructor(
    private batchrptserv:BatchReportYearService
  ) {


      this.chartOptions = {
          // series: [56.2, 43.8],
          series:this.batchcount,
          colors: ["#ee368c", "#757fef"],
          chart: {
              height: 365,
              type: "donut"
          },
          tooltip: {
              y: {
                  formatter: function (val) {
                      return "" + val + "%";
                  },
              },
          },
          stroke: {
              width: 1,
              show: true
          },
          legend: {
              offsetY: 0,
              fontSize: "14px",
              position: "bottom",
              horizontalAlign: "center"
          },
          // labels: ["Domestic", "International"]
          labels:this.months
      };
      this.batchreport();
     // this.startTimer();
  }

  batchreport()
  {
    this.batchrptserv.sBatch_year_wise_report().subscribe((res:APIResponse)=>{

      //console.log(res.data);
      res.data.forEach((element:any) => {
        this.batchcount.push(element.batch_count);
        this.months.push(element.month);
        //console.log(this.batchcount);
      });

    })


  }
  totaltime!:any;
  startTimer() {
    this.totaltime = setInterval(() => {
      //this.capture();
      this.batchreport();
      // this.counter++;
      // console.log(this.counter)

    },1000);

    console.log(this.totaltime);

}
}
