import { Component, OnInit, EventEmitter } from '@angular/core';
import { MapsService } from '../shared/services/maps.service';
import { Marker } from '../shared/models/marker.model';
@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

    private shift = false;
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

    public wipMarkers: Marker[] = [
        {
            lat: 53.945,
            lng: 27.904,
            label: 'A',
            draggable: false,
            animation: 'DROP'
        }
    ];

    public hotMarkers: Marker[] = [
        {
            lat: 53.935,
            lng: 27.904,
            label: 'A',
            draggable: false,
            animation: 'DROP'
        }
    ];

    public comingSoonMarkers: Marker[] = [
        {
            lat: 53.915,
            lng: 27.904,
            label: 'A',
            draggable: false,
            animation: 'DROP'
        }
    ];

    /*put into database for future using in user statistic & user cabinet*/
    dataBaseInfo = [];
    constructor(
        private mapService: MapsService,
    ) { }

    public markerOver(m: Marker) {
        m.animation = 'BOUNCE';
    }

    public markerOut(m: Marker) {
        m.animation = '';
    }

    ngOnInit() {
        this.mapService.getLocation().subscribe(data => {
            console.log(data);
            this.dataBaseInfo.push({ country: data.country_name, region: data.region, ip: data.ip, postal: data.postal });
            this.lat = data.latitude;
            this.lng = data.longitude;
        });
    }

    public markerClick($event) {
        if ($event._id !==  '0') {
            this.shift = !this.shift;
        }
        console.log($event);
    }
}
