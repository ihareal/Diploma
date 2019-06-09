import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    postUser(data: UserModel) {
        return this.http.post(this.rootUrl + '/UserDetails', this.data);
    }
    getUsers() {
        return this.http.get(this.rootUrl + '/UserDetails');
    }
}
