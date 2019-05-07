import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CarComponent } from './car/car.component';
import { HouseComponent } from './house/house.component';
import { MapComponent } from './map/map.component';
import { NewsComponent } from './news/news.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatListModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderSideNavComponent } from './header-side-nav/header-side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    CarComponent,
    HouseComponent,
    MapComponent,
    NewsComponent,
    HeaderComponent,
    HeaderSideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIuyI8VxR9oscUQJIi0OFl0DfkOhWwP9k'
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    LayoutModule,
    MatListModule,
    FormsModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
