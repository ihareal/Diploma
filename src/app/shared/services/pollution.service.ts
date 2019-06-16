import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class PollutionService {
    readonly rootUrl = 'https://localhost:44338/api';

    constructor(
        private http: HttpClient
    ) { }

    getPollutions() {
        return this.http.get(this.rootUrl + '/PollutionDetails');
    }
}
