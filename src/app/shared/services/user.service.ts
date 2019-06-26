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
        return this.http.post<UserModel>(this.rootUrl + '/UserDetails', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
    getUsers() {
        return this.http.get(this.rootUrl + '/UserDetails');
    }
}
