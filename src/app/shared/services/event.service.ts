import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class EventService {
    readonly rootUrl = 'https://localhost:44338/api';

    constructor(
        private http: HttpClient
    ) { }

    getEvents() {
        return this.http.get(this.rootUrl + '/EventDetails');
    }
}
