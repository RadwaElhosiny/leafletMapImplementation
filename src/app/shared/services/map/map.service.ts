import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {MapHttpService} from "../../../core/http/map/map-http.service";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private mapHttpService: MapHttpService) { }

  public getCoordinates(): Observable<any> {
    return this.mapHttpService.getCoordinates();
  }

  public getLocation(lat: number, lng: number): Observable<any> {
    return this.mapHttpService.getLocation(lat, lng);
  }
}
