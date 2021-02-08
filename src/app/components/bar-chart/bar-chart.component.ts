import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  
  public activeUsers = [];
  public inactiveUsers = [];
  public suspendedUsers = [];
  public preactiveUsers = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Subscribers'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[];

  constructor(
    public _httpService: HttpService,
  ) {
    [ 
      this.activeUsers, 
      this.inactiveUsers, 
      this.suspendedUsers, 
      this.preactiveUsers 
    ] = _httpService.getStadistics();
    this.barChartData = [
      { data: [this.activeUsers.length], label: 'Active' },
      { data: [this.inactiveUsers.length], label: 'Inactive' },
      { data: [this.suspendedUsers.length], label: 'Suspended' },
      { data: [this.preactiveUsers.length], label: 'Preactive' },
    ];    
   }
  ngOnInit(): void {
  }

}
