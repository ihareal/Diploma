import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CarComponent } from './car/car.component';
import { HouseComponent } from './house/house.component';
import { MapComponent, MarkerCreatingDialogComponent, PollutionCreatingDialogComponent } from './map/map.component';
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
import { MatDialogModule } from '@angular/material/dialog';
import { SignInComponent } from './header-side-nav/header-side-nav.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NewsReadingComponent } from './news-reading-component/news.reading.component';
import { PersonalAreaComponent } from './personal-area/personal.area.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { TextFieldModule } from '@angular/cdk/text-field';
import { InfoComponent } from './info/info.component';
import { AdminControlComponent } from './admin.control/admin.control.component';
import { StatisticComponent } from './statistic/statistic.component';
import { UserAreaComponent } from './user.area/user.area.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    CarComponent,
    HouseComponent,
    MapComponent,
    NewsComponent,
    HeaderComponent,
    HeaderSideNavComponent,
    SignInComponent,
    NewsReadingComponent,
    PersonalAreaComponent,
    MarkerCreatingDialogComponent,
    PollutionCreatingDialogComponent,
    InfoComponent,
    AdminControlComponent,
    StatisticComponent,
    UserAreaComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    MatTooltipModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TextFieldModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatRadioModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIuyI8VxR9oscUQJIi0OFl0DfkOhWwP9k'
    }),
    BrowserAnimationsModule,
    MatDialogModule,
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
  entryComponents: [SignInComponent, MarkerCreatingDialogComponent, PollutionCreatingDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
