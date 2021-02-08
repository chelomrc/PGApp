import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SuscribersComponent } from './components/suscribers/suscribers.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { SubscriberComponent } from './components/subscriber/subscriber.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    DoughnutChartComponent,
    HomeComponent,
    NavbarComponent,
    PieChartComponent,
    SearchComponent,
    SubscriberComponent,
    SuscribersComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
