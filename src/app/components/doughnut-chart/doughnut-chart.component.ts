import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  public topSubscribers: User[];

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    public _httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.topSubscribers = this._httpService.getTopSubscribers();
    this.doughnutChartLabels = this.topSubscribers.map((user) => 'ID: ' + user.SubscriberID);
    this.doughnutChartData = [this.topSubscribers.map((user) => +(+user.UsageBytes / 1048576).toFixed(2))];
  }

}
