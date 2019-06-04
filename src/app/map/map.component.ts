import { Component, OnInit, EventEmitter } from '@angular/core';
import { MapsService } from '../shared/services/maps.service';
import { Marker } from '../shared/models/marker.model';
import { MarkerCircle } from '../shared/models/marker.circle.model';
import { CheckingService } from '../shared/checking.service';
@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

    private shiftMarker = false;
    private shiftPollution = false;
    public description: string;
    public admin = false;
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
        },
        {
            lat: 53.899028,
            lng: 27.564069,
            draggable: false,
            animation: 'DROP',
        }
    ];

    public hotMarkers: Marker[] = [
        {
            lat: 53.935,
            lng: 27.904,
            label: 'A',
            draggable: false,
            animation: 'DROP'
        },
        {
            lat: 53.898547,
            lng: 27.569397,
            draggable: false,
            animation: 'DROP'
        },
        {
            lat: 53.901152,
            lng: 27.566414,
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
        },
        {
            lat: 53.879133,
            lng: 27.647825,
        },
        {
            lat: 53.883183,
            lng: 27.576386,
        },
        {
            lat: 53.895841,
            lng: 27.576037,
        }
    ];

    public temporaryPollutionCircle: MarkerCircle[] = [
        {
            lat: 53.908165,
            lng: 27.574209,
        },
        {
            lat: 53.93189819796218,
            lng: 27.585695404243438,
        },
        {
            lat: 53.911274,
            lng: 27.559396,
        },
    ];

    public pollutionMarkerDescription: MarkerCircle[] = [
        {
            lat: 53.89429197551946,
            lng: 27.644030780545904,
            description: 'Дражня'
        },
        {
            lat: 53.87952097033476,
            lng: 27.64883754277116,
            description: 'Минская ТЭЦ-3'
        },
        {
            lat: 53.883019905293764,
            lng: 27.57574540396331,
            description: 'Мотовелозавод'
        },
        {
            lat: 53.89636819340571,
            lng: 27.57593579233435,
            description: 'Станкостроительный завод'
        }
    ];

    /*put into database for future using in user statistic & user cabinet*/
    dataBaseInfo = [];
    constructor(
        private mapService: MapsService,
        private checkingService: CheckingService
    ) { }

    public markerOver(m: Marker) {
        m.animation = 'BOUNCE';
    }

    public markerOut(m: Marker) {
        m.animation = '';
    }

    ngOnInit() {
        this.admin = this.checkingService.checkForAdmin();
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
        // Only coords in event
        console.log($event.coords);
    }

    public markerForDescription($event) {
        this.shiftPollution = !this.shiftPollution;
        this.pollutionMarkerDescription.forEach(m => {
            if (m.lat === $event.latitude && m.lng === $event.longitude) {
                this.description = m.description;
            }
        });
    }

    public closeMarkerDescription() {
        this.shiftMarker = !this.shiftMarker;
    }

    public closePollutionDescription() {
        this.shiftPollution = !this.shiftPollution;
    }
}
