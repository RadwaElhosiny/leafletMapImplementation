import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapHttpService {

  constructor(private http: HttpClient) { }

  public getCoordinates(): Observable<any> {
    return this.http.get('./assets/files/coordinates.json');
  }

  public getLocation(lat: number, lng: number): Observable<any> {
    return this.http.get(`/geocode.xyz/[${lat},${lng}]&auth=11681966129806491427x103294?json=1`);
  }
}
