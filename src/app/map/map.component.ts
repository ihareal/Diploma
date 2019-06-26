import { Component, OnInit, EventEmitter, Inject, NgZone, ViewChild } from '@angular/core';
import { MapsService } from '../shared/services/maps.service';
import { Marker } from '../shared/models/marker.model';
import { MarkerCircle } from '../shared/models/marker.circle.model';
import { CheckingService } from '../shared/checking.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { DialogData } from '../header-side-nav/header-side-nav.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
    public changeTheme = false;
    public log = false;
    public mark = false;
    private shiftMarker = false;
    private shiftPollution = false;
    public pollutionMarker: string;
    public pollutionDescription: string;
    public pollutionTitle: string;
    public markerDescription: string;
    public markerTitle: string;
    public admin = false;
    public startDate: any;
    public endDate: any;
    lat = 53.848305;
    lng = 27.509436;

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

    public hotMarkers: Marker[] = [];
    public wipMarkers: Marker[] = [];
    public comingSoonMarkers: Marker[] = [];
    public allEvents = [];
    public eventsByUser = [];

    // public wipMarkers: Marker[] = [
    //     {
    //         lat: 53.945,
    //         lng: 27.904,
    //         label: 'A',
    //         title: 'wip маркер',
    //         description: 'wip описание',
    //         draggable: false,
    //         animation: 'DROP'
    //     },
    //     {
    //         lat: 53.899028,
    //         lng: 27.564069,
    //         title: 'wip маркер',
    //         description: 'wip описание',
    //         draggable: false,
    //         animation: 'DROP',
    //     }
    // ];

    // public hotMarkers: Marker[] = [
    //     {
    //         lat: 53.935,
    //         lng: 27.904,
    //         label: 'A',
    //         title: 'Forest layer revival',
    //         description: 'We want to restore forest layer. We need 10 trees, no matter what type they are',
    //         draggable: false,
    //         animation: 'DROP'
    //     },
    //     {
    //         lat: 53.898547,
    //         lng: 27.569397,
    //         title: 'hot маркер',
    //         description: 'hot описание',
    //         draggable: false,
    //         animation: 'DROP'
    //     },
    //     {
    //         lat: 53.901152,
    //         lng: 27.566414,
    //         title: 'hot маркер',
    //         description: 'hot описание',
    //         draggable: false,
    //         animation: 'DROP'
    //     }
    // ];

    // public comingSoonMarkers: Marker[] = [
    //     {
    //         lat: 53.915,
    //         lng: 27.904,
    //         label: 'A',
    //         title: 'coming soon маркер',
    //         description: 'coming soon описание',
    //         draggable: false,
    //         animation: 'DROP'
    //     }
    // ];

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
            lat: 53.894214,
            lng: 27.644620,
            title: 'заголовок загрязнения',
            description: 'Дражня'
        },
        {
            lat: 53.879133,
            lng: 27.647825,
            title: 'заголовок загрязнения',
            description: 'Минская ТЭЦ-3'
        },
        {
            lat: 53.883183,
            lng: 27.576386,
            title: 'заголовок загрязнения',
            description: 'Мотовелозавод'
        },
        {
            lat: 53.895841,
            lng: 27.576037,
            title: 'заголовок загрязнения',
            description: 'Станкостроительный завод'
        }
    ];

    public freshCircle = [
        {
            lat: 53.917355,
            lng: 27.614379,
        },
        {
            lat: 53.919135,
            lng: 27.536881,
        },
        {
            lat: 53.902647,
            lng: 27.572071,
        },
        {
            lat: 53.901278,
            lng: 27.562128,
        }

    ];

    public rootEventUrl = 'https://localhost:44338/api/EventDetails';
    public rootEventsByUser = 'https://localhost:44338/api/users/eventsByUser';
    public rootPostEventsByUser = 'https://localhost:44338/api/users/events?';

    public rootHotUrl = 'https://localhost:44338/api/EventDetails/HotEvents';
    public rootWipUrl = 'https://localhost:44338/api/EventDetails/WipEvents';
    public rootFutureUrl = 'https://localhost:44338/api/EventDetails/HotEvents';

    /*put into database for future using in user statistic & user cabinet*/
    dataBaseInfo = [];
    constructor(
        private mapService: MapsService,
        private checkingService: CheckingService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private http: HttpClient

    ) {

        forkJoin([
            this.http.get<any[]>(this.rootHotUrl),
            this.http.get<any[]>(this.rootWipUrl),
            this.http.get<any[]>(this.rootFutureUrl),
        ]).subscribe(([hot, wip, future]) => {
            hot.forEach(element => {
                // tslint:disable-next-line:max-line-length
                this.hotMarkers.push({ id: element['EventId'], lat: element['Latitude'], lng: element['Longitude'], title: element['Title'], description: element['Description'], label: element['EventId'], dateStart: element['StartDate'], dateEnd: element['EndDate'] });
                // debugger;
            });
            wip.forEach(element => {
                // tslint:disable-next-line:max-line-length
                this.wipMarkers.push({ id: element['EventId'], lat: element['Latitude'], lng: element['Longitude'], title: element['Title'], description: element['Description'], label: element['EventId'], dateStart: element['StartDate'], dateEnd: element['EndDate'] });
            });
            future.forEach(element => {
                // debugger;
                // tslint:disable-next-line:max-line-length
                this.comingSoonMarkers.push({ id: element['EventId'], lat: element['Latitude'], lng: element['Longitude'], title: element['Title'], description: element['Description'], label: element['EventId'], dateStart: element['StartDate'], dateEnd: element['EndDate'] });
            });
        });


        if (localStorage.getItem('UserId')) {
            let userId = localStorage.getItem('UserId');
            forkJoin([
                this.http.get<any[]>(this.rootEventUrl),
                this.http.get<any[]>(this.rootEventsByUser + `?userId=${userId}`),
            ]).subscribe(([root, eventsByUser]) => {
                this.allEvents = root;
                this.eventsByUser = eventsByUser;
            });
        }
    }

    public openDialog(lat, lng): void {
        const dialogRef = this.dialog.open(MarkerCreatingDialogComponent, {
            width: '550px',
            height: '600px',
            data: { lat: lat, lng: lng, type: 'unedfined', title: 'undefined', description: 'undefined' }
        });
        dialogRef.afterClosed().subscribe(result => {
            try {

                switch (result['type']) {
                    // tslint:disable-next-line:max-line-length
                    case 'hot': this.hotMarkers.push({ lat: result['lat'], lng: result['lng'], title: result['title'], description: result['description'] }); break;
                    // tslint:disable-next-line:max-line-length
                    case 'wip': this.wipMarkers.push({ lat: result['lat'], lng: result['lng'], title: result['title'], description: result['description'] }); break;
                    // tslint:disable-next-line:max-line-length
                    case 'future': this.comingSoonMarkers.push({ lat: result['lat'], lng: result['lng'], title: result['title'], description: result['description'] }); break;

                }
            } catch (e) { }
        });
    }

    public openPollutionDialog(lat, lng): void {
        const dialogRef = this.dialog.open(PollutionCreatingDialogComponent, {
            width: '550px',
            height: '600px',
            data: { lat: lat, lng: lng, type: 'unedfined', title: 'undefined', description: 'undefined' }
        });
        dialogRef.afterClosed().subscribe(result => {
            try {
                switch (result['type']) {
                    // tslint:disable-next-line:max-line-length
                    case 'constant': this.constantPollutionCircle.push({ lat: result['lat'], lng: result['lng'] }); this.pollutionMarkerDescription.push({ lat: result['lat'], lng: result['lng'], title: result['title'], description: result['description'] }); break;
                    // tslint:disable-next-line:max-line-length
                    case 'temporary': this.temporaryPollutionCircle.push({ lat: result['lat'], lng: result['lng'] }); break;

                }
            } catch (e) { }
        });
    }

    public markerOver(m: Marker) {
        m.animation = 'BOUNCE';
    }

    public markerOut(m: Marker) {
        m.animation = '';
    }

    ngOnInit() {
        const themeType = localStorage.getItem('theme');
        if (themeType === 'eye') {
            this.changeTheme = true;
        }
        this.log = this.checkingService.checkForLog();
        this.admin = this.checkingService.checkForAdmin();
        this.mapService.getLocation().subscribe(data => {
            console.log(data);
            this.dataBaseInfo.push({ country: data.country_name, region: data.region, ip: data.ip, postal: data.postal });
            // this.lat = data.latitude;
            // this.lng = data.longitude;
        });
    }

    public wipMarkerClick($event) {
        localStorage.setItem('markerId', $event.label);
        this.wipMarkers.forEach(wipMarker => {
            if (wipMarker.lat === $event.latitude && wipMarker.lng === $event.longitude) {
                this.markerDescription = wipMarker.description;
                this.markerTitle = wipMarker.title;
                this.startDate = new Date(wipMarker.dateStart).toUTCString();
                this.endDate = new Date(wipMarker.dateEnd).toUTCString();
            }
        });
    }

    public hotMarkerClick($event) {
        localStorage.setItem('markerId', $event.label);
        this.hotMarkers.forEach(hotMarker => {
            if (hotMarker.lat === $event.latitude && hotMarker.lng === $event.longitude) {
                this.markerDescription = hotMarker.description;
                this.markerTitle = hotMarker.title;
                this.startDate = new Date(hotMarker.dateStart).toUTCString();
                this.endDate = new Date(hotMarker.dateEnd).toUTCString();
            }
        });
    }

    public comingMarkerClick($event) {
        localStorage.setItem('markerId', $event.label);
        this.comingSoonMarkers.forEach(comMarker => {
            if (comMarker.lat === $event.latitude && comMarker.lng === $event.longitude) {
                this.markerDescription = comMarker.description;
                this.markerTitle = comMarker.title;
                this.startDate = new Date(comMarker.dateStart).toUTCString();
                this.endDate = new Date(comMarker.dateEnd).toUTCString();
            }
        });
    }

    public circleClick($event) {
        // Only coords in event
        console.log($event.coords);
    }

    public markerForDescription($event) {
        this.shiftPollution = !this.shiftPollution;
        this.pollutionMarkerDescription.forEach(m => {
            if (m.lat === $event.latitude && m.lng === $event.longitude) {
                this.pollutionDescription = m.description;
                this.pollutionTitle = m.title;
            }
        });
    }

    public closeMarkerDescription() {
        this.shiftMarker = !this.shiftMarker;
    }

    public closePollutionDescription() {
        this.shiftPollution = !this.shiftPollution;
    }

    public addMarker(lat, lng) {
        if (localStorage.getItem('role') === 'admin') {
            this.openDialog(lat, lng);
        }
    }

    public addPollution(lat, lng) {
        if (localStorage.getItem('role') === 'admin') {
            this.openPollutionDialog(lat, lng);
        }
    }

    public markerClick($event) {
        if ($event._id !== '0') {
            this.shiftMarker = !this.shiftMarker;
        }

        let userId = localStorage.getItem('UserId');
        let eventId = localStorage.getItem('markerId');
        let event: any;
        for (event of this.eventsByUser) {
            if ($event.label === event.EventId) {
                this.mark = true;
                break;
            } else { this.mark = false; }
        }

    }

    removeMark() {
        let userId = localStorage.getItem('UserId');
        let eventId = localStorage.getItem('markerId');
        this.mark = false;
        this.http.get(`https://localhost:44338/api/users/eventDelete?userId=${userId}&eventId=${eventId}`).subscribe(res => {
            console.log(res);
        });
    }

    addMark() {
        let userId = localStorage.getItem('UserId');
        let eventId = localStorage.getItem('markerId');
        this.http.get(this.rootPostEventsByUser + `userId=${userId}&eventId=${eventId}`).subscribe(
            res => { console.log(res); },
            err => { console.log(err); }
        );
        this.http.get<any[]>(this.rootEventsByUser + `?userId=${userId}`).subscribe(eventsByUser => {
            this.eventsByUser = eventsByUser;
        });

        this.mark = true;
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    }
}


@Component({
    selector: 'app-marker-creating-dialog',
    templateUrl: 'marker.creating.dialog.html',
    styleUrls: ['marker.creating.dialog.css']
})
export class MarkerCreatingDialogComponent implements OnInit {
    public markerCreatingForm: FormGroup;
    public hot = false;
    public wip = false;
    public future = false;
    public title: string;
    public description: string;
    constructor(
        public dialogRef: MatDialogRef<MarkerCreatingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private _ngZone: NgZone,
        private fb: FormBuilder) { }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;
    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable.pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }
    ngOnInit() {
        this.markerCreatingForm = this.fb.group({
            title: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            description: ['', Validators.compose([Validators.required, Validators.minLength(20)])]
        });
    }

    get f() { return this.markerCreatingForm.controls; }

    public hotClick() {
        this.hot = true;
    }

    public wipClick() {
        this.wip = true;
    }

    public futClick() {
        this.future = true;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onOkClick(): void {
        if (this.hot === true) {
            this.data['type'] = 'hot';
            this.data['title'] = this.title;
            this.data['description'] = this.description;
            this.dialogRef.close(this.data);
        } else if (this.wip === true) {
            this.data['type'] = 'wip';
            this.data['title'] = this.title;
            this.data['description'] = this.description;
            this.dialogRef.close(this.data);
        } else if (this.future === true) {
            this.data['type'] = 'future';
            this.data['title'] = this.title;
            this.data['description'] = this.description;
            this.dialogRef.close(this.data);
        }
    }

}


@Component({
    selector: 'app-pollution-creating-dialog',
    templateUrl: 'pollution.creating.dialog.html',
    styleUrls: ['pollution.creating.dialog.css']
})
export class PollutionCreatingDialogComponent implements OnInit {
    public creatingPollutionForm: FormGroup;
    public temporary = false;
    public constant = false;
    public title: string;
    public description: string;

    constructor(
        public dialogRef: MatDialogRef<PollutionCreatingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private _ngZone: NgZone,
        private fb: FormBuilder) { }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;
    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable.pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    ngOnInit() {
        this.creatingPollutionForm = this.fb.group({
            title: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            description: ['', Validators.compose([Validators.required, Validators.minLength(20)])],
            constant: [''],
            temporary: ['']
        });
    }

    get f() { return this.creatingPollutionForm.controls; }

    public temporaryClick() {
        this.temporary = true;
    }

    public constantClick() {
        this.constant = true;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onOkClick(): void {
        if (this.constant === true) {
            this.data['type'] = 'constant';
            this.data['title'] = this.title;
            this.data['description'] = this.description;
            this.dialogRef.close(this.data);
        } else if (this.temporary === true) {
            this.data['type'] = 'temporary';
            this.data['title'] = this.title;
            this.data['description'] = this.description;
            this.dialogRef.close(this.data);
        }
    }

}
