import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-suscribers',
  templateUrl: './suscribers.component.html',
  styleUrls: ['./suscribers.component.css']
})
export class SuscribersComponent implements OnInit {

  public users: User[];
  public totalSubscribers: string;
  public isLoading: boolean = true;
  public activeUsers: User[];
  public inactiveUsers: User[];
  public suspendedUsers: User[];
  public preactiveUsers: User[];


  constructor(
    public _httpService: HttpService,
  ) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }

  ngOnInit(): void {
    this.totalSubscribers = this._httpService.totalSubscribers;    
    [ 
      this.activeUsers, 
      this.inactiveUsers, 
      this.suspendedUsers, 
      this.preactiveUsers 
    ] = this._httpService.getStadistics();
  }

}
