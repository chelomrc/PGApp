import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { SubscriberComponent } from './components/subscriber/subscriber.component';
import { SuscribersComponent } from './components/suscribers/suscribers.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'subscribers', component: SuscribersComponent
  },
  {
    path: 'subscriber/:id', component: SubscriberComponent
  },
  {
    path: 'search/:query', component: SearchComponent
  },
  {
    path: '**', component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
