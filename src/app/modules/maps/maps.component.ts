import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {MapService} from "../../shared/services/map/map.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit {

  map;
  mapCoordinates;
  mapMarker;
  lat;
  lng;

  constructor(private mapService: MapService, private router: Router) { }

  // can use this function of number of coordinates are too big or slow the network.
  chunkCoordinatesArray() {
    let arrays = [], size = 100;
    while (this.mapCoordinates.length > 0) {
      arrays.push(this.mapCoordinates.splice(0, size));
    }


    console.log(arrays);
  }
  async getMapCoordinates() {
    for (let i = 1; i < this.mapCoordinates.length; i++) {
      this.lat = this.mapCoordinates[i].lat;
      this.lng = this.mapCoordinates[i].lng;
      this.mapMarker.setLatLng([this.lat, this.lng]);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.lat, this.lng],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 1,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    const icon = L.icon({
      iconUrl: 'assets/images/marker-icon.png',
      popupAnchor: [13, 0],
    });

    this.mapMarker = L.marker([ this.lat, this.lng ], { icon }).bindPopup('Angular Leaflet');
    this.mapMarker.addTo(this.map);
  }

  uniqueArrayOfCoordinates(originalArray) {
    let uniqueArr = [];
    originalArray.filter(function(item){
      let i = uniqueArr.findIndex(x => (x.lat == item.lat && x.lng == item.lng));
      if(i <= -1){
        uniqueArr.push(item);
      }
    });
    return uniqueArr;
  }
  ngAfterViewInit(): void {
    this.mapService.getCoordinates().subscribe(result => {
      this.mapCoordinates = this.uniqueArrayOfCoordinates(result.coordinates);
      // setting first lat & lng to initiate the map
      this.lat = this.mapCoordinates[0].lat;
      this.lng = this.mapCoordinates[0].lng;
      this.initMap();
      this.getMapCoordinates().then();
    });
  }

  logout(): void {
    localStorage.removeItem('access-token');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }



}
