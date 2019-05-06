import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Location {
  latitude: string;
  longitude: string;
  country_name: string;
  ip: string;
  postal: string;
  region: string;
}

@Injectable({
  providedIn: 'root'
})

export class MapsService {

  constructor(private http: HttpClient) { }

  getLocation() {
    return this.http.get<Location>('https://ipapi.co/json/');
  }
}
