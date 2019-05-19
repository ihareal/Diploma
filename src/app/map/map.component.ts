import { Component, OnInit, EventEmitter } from '@angular/core';
import { MapsService } from '../shared/services/maps.service';
import { Marker } from '../shared/models/marker.model';
import { MarkerCircle } from '../shared/models/marker.circle.model';
@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

    private shiftMarker = false;
    private shiftPollution = false;
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

    public constantPollutionCircle: MarkerCircle[] = [
        {
            lat: 53.894214,
            lng: 27.644620,
            description: 'adhfaskdjfhaskldfh',
        },
        {
            lat: 53.879133,
            lng: 27.647825,
            description: 'adhfaskdjfhaskldfh',
        },
        {
            lat: 53.883183,
            lng: 27.576386,
            description: 'adhfaskdjfhaskldfh',
        },
        {
            lat: 53.895841,
            lng: 27.576037,
            description: 'adhfaskdjfhaskldfh',
        }
    ];

    public temporaryPollutionCircle: MarkerCircle[] = [
        {
            lat: 53.908165,
            lng: 27.574209,
        },
        {
            lat: 53.930959,
            lng: 27.576597,
        },
        {
            lat: 53.911274,
            lng: 27.559396,
        },
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
        if ($event._id !== '0') {
            this.shiftMarker = !this.shiftMarker;
        }
        console.log($event);
    }

    public circleClick($event) {
        this.shiftPollution = !this.shiftPollution;
        console.log($event);
    }
}
