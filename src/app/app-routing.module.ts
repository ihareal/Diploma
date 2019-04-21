import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { CarComponent } from './car/car.component';
import { HouseComponent } from './house/house.component';
import { MapComponent } from './map/map.component';
import { NewsComponent } from './news/news.component';
import { HeaderComponent } from './header/header.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HeaderComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'car', component: CarComponent },
  { path: 'house', component: HouseComponent },
  { path: 'map', component: MapComponent },
  { path: 'news', component: NewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
