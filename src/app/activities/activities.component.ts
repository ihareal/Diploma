import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
@Component({
    selector: 'app-activities',
    templateUrl: 'activities.component.html',
    styleUrls: ['./activities.component.css']
})

export class ActivitiesComponent implements OnInit {
    participate = [];
    public userId: any;
    refuse = [];

    public rootEventUrl = 'https://localhost:44338/api/EventDetails';
    public rootEventsByUser = 'https://localhost:44338/api/users/eventsByUser';
    public rootPostEventsByUser = 'https://localhost:44338/api/users/events?';


    public allEvents = [];
    public eventsByUser = [];
    public partIds = [];
    drop(event: CdkDragDrop<string[]>) {
        console.log(event);
        if (event.previousContainer === event.container) {
            // Если пользователь недоятянул
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            debugger;
            // Если дотянул успешно
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);

            if (event.container.id === 'cdk-drop-list-0') {
                // post if sdk = 0 
            ///    this.http.get(`https://localhost:44338/api/users/eventDelete?userId=${userId}&eventId=${eventId}`).subscribe(res => {
            ///        console.log(res);
            ///     });
            } else if (event.container.id === 'cdk-drop-list-1') {
                // delete if sdk = 1
             //   this.http.get(this.rootPostEventsByUser + `userId=${userId}&eventId=${eventId}`).subscribe(
             //       res => { console.log(res); },
             //       err => { console.log(err); }
             //   );
            }
        }
    }

    constructor(private http: HttpClient) {
        if (localStorage.getItem('UserId')) {
            let userId = localStorage.getItem('UserId');
            forkJoin([
                this.http.get<any[]>(this.rootEventUrl),
                this.http.get<any[]>(this.rootEventsByUser + `?userId=${userId}`),
            ]).subscribe(([root, eventsByUser]) => {
                debugger;
                this.allEvents = root;
                this.eventsByUser = eventsByUser;

                this.eventsByUser.forEach(eventByUser => {
                    debugger;
                    this.allEvents.forEach(event => {
                        debugger;
                        if (eventByUser.EventId === event.EventId) {
                            this.participate.push(event.Title);
                        }
                    });
                });
            });
        }
    }

    ngOnInit() {

    }
}
