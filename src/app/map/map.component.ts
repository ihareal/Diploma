import { Component, OnInit, EventEmitter, Inject, NgZone, ViewChild } from '@angular/core';
import { MapsService } from '../shared/services/maps.service';
import { Marker } from '../shared/models/marker.model';
import { MarkerCircle } from '../shared/models/marker.circle.model';
import { CheckingService } from '../shared/checking.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { DialogData, SignInComponent } from '../header-side-nav/header-side-nav.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        },
        {
            lat: 53.921847,
            lng: 27.503373,
        },
        {
            lat: 53.902227,
            lng: 27.523752,
        },
        {
            lat: 53.871275,
            lng: 27.643969,
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
            title: 'Teasing',
            description: 'The association between the 24-h average ambient PM10, SO2 and NO2 levels and daily respiratory (RD), cardiovascular (CVD) and cerebrovascular (CBD) mortality in Cape Town (2001–2006) was investigated with a case-crossover design. For models that included entire year data, an inter-quartile range (IQR) increase in PM10 (12 mg/m3) and NO2 (12 mg/m3) significantly increased CBD mortality by 4% and 8%, respectively.'
        },
        {
            lat: 53.879133,
            lng: 27.647825,
            title: 'Minsk TPP-3',
            // tslint:disable-next-line:max-line-length
            description: 'All power plants have a physical footprint (the location of the power plant). Some power plants are located inside, on, or next to an existing building, so the footprint is fairly small. Most large power plants require land clearing to build the power plant. Some power plants may also require access roads, railroads, and pipelines for fuel delivery, electricity transmission lines, and cooling water supplies. Power plants that burn solid fuels may have areas to store the combustion ash. Many power plants are large structures that alter the visual landscape. In general, the larger the structure, the more likely it is that the power plant will affect the visual landscape.'
        },
        {
            lat: 53.883183,
            lng: 27.576386,
            title: 'Motorcycle factory',
            // tslint:disable-next-line:max-line-length
            description: 'Even looking at these emissions, you would think that the construction of a motorcycle would have less environmental impact, - on average - than a car. I thought so anyway.'
        },
        {
            lat: 53.895841,
            lng: 27.576037,
            title: 'Machine Tool Plant',
            // tslint:disable-next-line:max-line-length
            description: 'High level of noise is a disturbance to the human environment. Noise in industries is also an occupational hazard because of its attendant effects on workers health. Noise presents health and social problems in industrial operations, and the source is related to the machineries used in the industries. One of the unique features of the noise associated with wood machinery is the level of exposure and duration. Equipment used in a factory can be extremely loud.'
        },
        {
            lat: 53.921847,
            lng: 27.503373,
            title: 'Experienced Metalworking Plant',
            // tslint:disable-next-line:max-line-length
            description: 'Metal production and processing businesses can cause significant pollution. Metal production and processing includes manufacturing ferrous, non-ferrous and precious metals and alloys; metal forming processes; bar, wire and tube drawing; and metal casting.Your activities may cause air pollution from fumes and dust, noise pollution from materials handling and deliveries to your site, water pollution from contaminated discharges.'
        },
        {
            lat: 53.902227,
            lng: 27.523752,
            title: 'Building Products Factory',
            // tslint:disable-next-line:max-line-length
            description: 'Construction activities that contribute to air pollution include: land clearing, operation of diesel engines, demolition, burning, and working with toxic materials. All construction sites generate high levels of dust (typically from concrete, cement, wood, stone, silica) and this can carry for large distances over a long period of time. Construction dust is classified as PM10 - particulate matter less than 10 microns in diameter, invisible to the naked eye.'
        },
        {
            lat: 53.871275,
            lng: 27.643969,
            title: 'Resource Plant OJSC MAZ',
            // tslint:disable-next-line:max-line-length
            description: 'Oil refining, for instance, is a process called fractional distillation that heats petroleum to high temperatures to separate it into various grades of gasoline and other petroleum products. Doing so releases sulfur dioxide into the air. Other manufacturing types use heat from coal or diesel furnaces to provide steam power to run the plant. Burning these fuels can also release pollutants into the air.'
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
        },
        {
            lat: 53.849716,
            lng: 27.607845
        },
        {
            lat: 53.854269,
            lng: 27.578835
        },
        {
            lat: 53.845896,
            lng: 27.519459
        },
        {
            lat: 53.835050,
            lng: 27.471357
        },
        {
            lat: 53.714944,
            lng: 27.601997
        },
        {
            lat: 53.952384,
            lng: 27.651216
        },
        {
            lat: 53.960502,
            lng: 27.469174,
        }

    ];

    public rootEventUrl = 'https://localhost:44338/api/EventDetails';
    public rootEventsByUser = 'https://localhost:44338/api/users/eventsByUser';
    public rootPostEventsByUser = 'https://localhost:44338/api/users/events?';

    public rootConstant = 'https://localhost:44338/api/PollutionDetails/ConstantPollution';
    public rootTemporary = 'https://localhost:44338/api/PollutionDetails/TemporaryPollution';

    public rootHotUrl = 'https://localhost:44338/api/EventDetails/HotEvents';
    public rootWipUrl = 'https://localhost:44338/api/EventDetails/WipEvents';
    public rootFutureUrl = 'https://localhost:44338/api/EventDetails/FutureEvents';
    public rootPollutionUrl = 'https://localhost:44338/api/PollutionDetails';

    /*put into database for future using in user statistic & user cabinet*/
    dataBaseInfo = [];
    constructor(
        private mapService: MapsService,
        private checkingService: CheckingService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private http: HttpClient,

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

        // forkJoin([
        //     this.http.get<any[]>(this.rootConstant),
        //     this.http.get<any[]>(this.rootTemporary),
        // ]).subscribe(([constant, temporary]) => {
        //     constant.forEach(element => {
        //         // tslint:disable-next-line:max-line-length
        //         this.pollutionMarkerDescription.push({ lat: element['Latitude'], lng: element['Longitude'], title: element['Title'], description: element['Description'] });
        //     });
        //     temporary.forEach(element => {
        //         this.temporaryPollutionCircle.push({ lat: element['Latitude'], lng: element['Longitude'] });
        //     });
        // });


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

    public openSignIn() {
        const dialogRef = this.dialog.open(SignInComponent, {
            width: '550px',
            height: '600px',
        }).afterClosed().subscribe(closed => {
            window.location.reload();
        });
    }

    public openDialog(lat, lng): void {
        const dialogRef = this.dialog.open(MarkerCreatingDialogComponent, {
            width: '550px',
            height: '600px',
            // tslint:disable-next-line:max-line-length
            data: { lat: lat, lng: lng, type: 'unedfined', title: 'undefined', description: 'undefined', dateStart: 'undefined', dateEnd: 'undefined' }
        });
        dialogRef.afterClosed().subscribe(result => {
            try {

                switch (result['type']) {
                    // tslint:disable-next-line:max-line-length
                    case 'hot':
                        // tslint:disable-next-line:max-line-length
                        debugger;
                        let data = {
                            // tslint:disable-next-line:max-line-length
                            Latitude: result['lat'], Longitude: result['lng'], Title: result['title'], Description: result['description'], StartDate: result['dateStart'], EndDate: result['dateEnd'], Status: 'HOT'
                        };
                        this.http.post(this.rootEventUrl, data, {
                            headers: new HttpHeaders({
                                'Content-Type': 'application/json'
                            })
                        }).subscribe(res => {
                            console.log(res);
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
                        });

                        break;
                    // tslint:disable-next-line:max-line-length
                    case 'wip':
                        let data1 = {
                            // tslint:disable-next-line:max-line-length
                            Latitude: result['lat'], Longitude: result['lng'], Title: result['title'], Description: result['description'], StartDate: result['dateStart'], EndDate: result['dateEnd'], Status: 'WIP'
                        };
                        this.http.post(this.rootEventUrl, data1, {
                            headers: new HttpHeaders({
                                'Content-Type': 'application/json'
                            })
                        }).subscribe(res => {
                            console.log(res);
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
                        });

                        break;
                    // tslint:disable-next-line:max-line-length
                    case 'future':
                        let data2 = {
                            // tslint:disable-next-line:max-line-length
                            Latitude: result['lat'], Longitude: result['lng'], Title: result['title'], Description: result['description'], StartDate: result['dateStart'], EndDate: result['dateEnd'], Status: 'FUTURE'
                        };
                        this.http.post(this.rootEventUrl, data2, {
                            headers: new HttpHeaders({
                                'Content-Type': 'application/json'
                            })
                        }).subscribe(res => {
                            console.log(res);
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
                        });
                        break;

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
                    case 'constant': this.constantPollutionCircle.push({ lat: result['lat'], lng: result['lng'] }); this.pollutionMarkerDescription.push({ lat: result['lat'], lng: result['lng'], title: result['title'], description: result['description'] });
                        // let data0 = {
                        //     // tslint:disable-next-line:max-line-length
                        //     UserId: localStorage['UserId'], Latitude: result['lat'], Longitude: result['lng'], Title: result['title'], Description: result['description'], Status: 'CONSTANT', CreationDate: new Date()
                        // };
                        // this.http.post(this.rootPollutionUrl, data0, {
                        //     headers: new HttpHeaders({
                        //         'Content-Type': 'application/json'
                        //     })
                        // }).subscribe(res => {
                        //     forkJoin([
                        //         this.http.get<any[]>(this.rootConstant),
                        //         this.http.get<any[]>(this.rootTemporary),
                        //     ]).subscribe(([constant, temporary]) => {
                        //         constant.forEach(element => {
                        //             // tslint:disable-next-line:max-line-length
                        //             this.pollutionMarkerDescription.push({ lat: element['Latitude'], lng: element['Longitude'], title: element['Title'], description: element['Description'] });
                        //         });
                        //         temporary.forEach(element => {
                        //             this.temporaryPollutionCircle.push({ lat: element['Latitude'], lng: element['Longitude'] });
                        //         });
                        //     });
                        // });
                        break;
                    // tslint:disable-next-line:max-line-length
                    case 'temporary':
                        this.temporaryPollutionCircle.push({ lat: result['lat'], lng: result['lng'] });

                        // let data1 = {
                        //     // tslint:disable-next-line:max-line-length
                        //     UserId: localStorage['UserId'], Latitude: result['lat'], Longitude: result['lng'], Title: result['title'], Description: result['description'], Status: 'TEMPORARY', CreationDate: new Date()
                        // };
                        // this.http.post(this.rootPollutionUrl, data1, {
                        //     headers: new HttpHeaders({
                        //         'Content-Type': 'application/json'
                        //     })
                        // }).subscribe(res => {
                        //     forkJoin([
                        //         this.http.get<any[]>(this.rootConstant),
                        //         this.http.get<any[]>(this.rootTemporary),
                        //     ]).subscribe(([constant, temporary]) => {
                        //         constant.forEach(element => {
                        //             // tslint:disable-next-line:max-line-length
                        //             this.pollutionMarkerDescription.push({ lat: element['Latitude'], lng: element['Longitude'], title: element['Title'], description: element['Description'] });
                        //         });
                        //         temporary.forEach(element => {
                        //             this.temporaryPollutionCircle.push({ lat: element['Latitude'], lng: element['Longitude'] });
                        //         });
                        //     });
                        // });

                        break;

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
    public dateStart: string;
    public dateEnd: string;
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
            description: ['', Validators.compose([Validators.required, Validators.minLength(20)])],
            dateStart: [''],
            dateEnd: ['']
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
            console.log(this.data);
            this.data['type'] = 'hot';
            this.data['title'] = this.title;
            this.data['description'] = this.description;
            this.data['dateStart'] = this.markerCreatingForm.controls['dateStart'].value;
            this.data['dateEnd'] = this.markerCreatingForm.controls['dateEnd'].value;

            this.dialogRef.close(this.data);
        } else if (this.wip === true) {
            this.data['type'] = 'wip';
            this.data['title'] = this.title;
            this.data['description'] = this.description;
            this.data['dateStart'] = this.markerCreatingForm.controls['dateStart'].value;
            this.data['dateEnd'] = this.markerCreatingForm.controls['dateEnd'].value;
            this.dialogRef.close(this.data);
        } else if (this.future === true) {
            this.data['type'] = 'future';
            this.data['title'] = this.title;
            this.data['description'] = this.description;
            this.data['dateStart'] = this.markerCreatingForm.controls['dateStart'].value;
            this.data['dateEnd'] = this.markerCreatingForm.controls['dateEnd'].value;
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
