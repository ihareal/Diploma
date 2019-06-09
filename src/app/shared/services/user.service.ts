import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    data: UserModel;
    readonly rootUrl = 'https://localhost:44338/api';
    list: UserModel[];

    constructor(
        private http: HttpClient
    ) { }

    postUser(data) {
        //return this.http.post(this.rootUrl + '/UserDetails', this.data, 'Content-Type', 'application/json; charset=utf-8');
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.rootUrl + '/UserDetails', data, {headers: headers});
    }
    getUsers() {
        return this.http.get(this.rootUrl + '/UserDetails');
    }
}
