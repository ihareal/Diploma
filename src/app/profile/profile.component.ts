import { Component, OnInit } from '@angular/core';
import { MapsService } from '../shared/services/maps.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public lat = '';
  public lng = '';
  public email = '';
  public flatStage = '';
  public stageAmount = '';
  public houseType = '';
  public district = '';
  constructor(
    private mapService: MapsService,
  ) { }

  ngOnInit() {
    this.mapService.getLocation().subscribe(data => {
      this.lat = data.latitude;
      this.lng = data.longitude;
      this.email = localStorage['email'];
      this.flatStage = localStorage['flatStage'];
      this.stageAmount = localStorage['stageHouseAmount'];
      this.houseType = localStorage['houseType'];
      this.district = localStorage['district'];
    });

  }

}
