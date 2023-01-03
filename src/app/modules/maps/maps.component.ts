import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {MapService} from "../../shared/services/map/map.service";
import {Router} from "@angular/router";
import 'leaflet/dist/images/marker-shadow.png';
import { Observable, of, from } from 'rxjs';
import { delay, map, concatAll, toArray, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit {

  mapCoordinates;
  lat;
  lng;
  mapOptions;
  layers;
  

  constructor(private mapService: MapService, private router: Router) { }

  getRandomDelayValues(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  } 
  // can use this function of number of coordinates are too big or slow the network.
  chunkCoordinatesArray() {
    let arrays = [], size = 100;
    while (this.mapCoordinates.length > 0) {
      arrays.push(this.mapCoordinates.splice(0, size));
    }
    console.log(arrays);
  }
  getMapCoordinates(): Observable<any>{
    const cordinates = from(this.mapCoordinates)
    .pipe(
      map(x => of(x).pipe(delay(this.getRandomDelayValues(2,5)*1000))),
      concatAll()
    )
    return cordinates;
  }
  private initMap(): void {

    this.mapOptions = {
      layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 10,
    center: L.latLng(this.lat,this.lng)
  }

  this.layers = [
    L.marker([this.lat, this.lng])];
  }

  uniqueArrayOfCoordinates(originalArray: any){
    const areCoordinatesEqual = (coordinate1,coordinate2):
     boolean => coordinate1.lat === coordinate2.lat && coordinate1.lng === coordinate2.lng;
    const uniquArray = from (originalArray).pipe(
      distinctUntilChanged (areCoordinatesEqual), toArray());
    return uniquArray;
  }
  ngAfterViewInit(): void {
    this.mapService.getCoordinates().subscribe(result => {
      this.uniqueArrayOfCoordinates(result.coordinates).subscribe(coordinates => this.mapCoordinates = coordinates)
      // setting first lat & lng to initiate the map
      this.lat = this.mapCoordinates[0].lat;
      this.lng = this.mapCoordinates[0].lng;
      this.initMap();
      this.getMapCoordinates().subscribe(cordinate =>{
        this.lat = cordinate.lat;
        this.lng = cordinate.lng;
        this.layers = [ L.marker([this.lat, this.lng])];
        });
    });
  }

  logout(): void {
    localStorage.removeItem('access-token');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
