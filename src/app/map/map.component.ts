import { Component, OnInit } from '@angular/core';
import { MapsService } from '../shared/services/maps.service';

@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
    lat = '';
    lng = '';

    wipIcon = {
        url: ('../../assets/icons/yellow-map-localization.svg'),
        scaledSize: { width: 50, height: 60 }
    };

    hotIcon = {
        url: ('../../assets/icons/red-map-localization.svg'),
        scaledSize: { width: 50, height: 60 }
    };

    commingSoonIcon = {
        url: ('../../assets/icons/green-map-localization.svg'),
        scaledSize: { width: 50, height: 60 }
    };


    lat2 = '53.945';
    lng2 = '27.904';

    /*put into database for future using in user statistic & user cabinet*/
    dataBaseInfo = [];
    location: Object;

    constructor(private mapService: MapsService) { }

    ngOnInit() {
        this.mapService.getLocation().subscribe(data => {
            console.log(data);
            this.dataBaseInfo.push({ country: data.country_name, region: data.region, ip: data.ip, postal: data.postal });
            this.lat = data.latitude;
            this.lng = data.longitude;
        });
    }

    public markerClick($event) {
        console.log($event);
    }
}
