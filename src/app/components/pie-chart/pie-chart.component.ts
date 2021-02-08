import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  public activeUsers = [];
  public inactiveUsers = [];
  public suspendedUsers = [];
  public preactiveUsers = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Active', 'Inactive', 'Preactive', 'Suspended'];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    public _httpService: HttpService,
  ) { 
    [ 
      this.activeUsers, 
      this.inactiveUsers, 
      this.suspendedUsers, 
      this.preactiveUsers 
    ] = _httpService.getStadistics();
    this.pieChartData = [ 
      this.activeUsers.length,
      this.inactiveUsers.length,
      this.suspendedUsers.length,
      this.preactiveUsers.length
     ]
  }

  ngOnInit(): void {
  }

}
