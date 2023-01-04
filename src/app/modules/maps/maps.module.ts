import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsComponent } from './maps.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [MapsComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
    LeafletModule,
    MatSidenavModule,
    MatIconModule
  ]
})
export class MapsModule { }
