import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { CarComponent } from './car/car.component';
import { HouseComponent } from './house/house.component';
import { MapComponent } from './map/map.component';
import { NewsComponent } from './news/news.component';
import { HeaderComponent } from './header/header.component';
import { PersonalAreaComponent } from './personal-area/personal.area.component';
import { NewsReadingComponent } from './news-reading-component/news.reading.component';
import { AdminControlComponent } from './admin.control/admin.control.component';
import { StatisticComponent } from './statistic/statistic.component';
import { UserAreaComponent } from './user.area/user.area.component';
import { ProfileComponent } from './profile/profile.component';



// const childAdminRoutes = [
//   { path: 'control-panel', component: AdminControlComponent },
//   { path: 'statistic-zone', component: StatisticComponent }
// ];

const personalAreaOptionsRoutes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'control-panel', component: AdminControlComponent },
  { path: 'statistic-zone', component: StatisticComponent }
];

// const dividerRoleRoutes = [
//   { path: 'admin', component: PersonalAreaComponent, children: childAdminRoutes },
//   { path: 'user', component: PersonalAreaComponent, children: childUserRoutes },
// ];


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HeaderComponent },
  { path: 'car', component: CarComponent },
  { path: 'house', component: HouseComponent },
  { path: 'map', component: MapComponent },
  { path: 'news', component: NewsComponent },
  { path: 'personal-area', component: PersonalAreaComponent, children: personalAreaOptionsRoutes },
  { path: 'news-reading-component', component: NewsReadingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
