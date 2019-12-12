import { Component, AfterViewInit } from '@angular/core';
import { Map, Circle, TileLayer, LeafletMouseEvent } from 'leaflet';
import { OptionsService } from '../services/options.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leaflet-map',
  template: `
  <div class="map-container">
    <div class="map-frame">
      <div id="map"></div>
    </div>
  </div>`,
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit {
  private map: Map;
  private circle: Circle;

  private radius: number;

  private subscription = new Subscription();

  constructor(private optionsService: OptionsService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.map.on('click', (e: LeafletMouseEvent) => this.onMapClick(e));

    this.subscription.add(this.optionsService.getRadius().subscribe(obs => {
      this.radius = obs;
      this.updateCircle(this.radius);
    }));
  }

  private updateCircle(value: number) {
    if (this.circle) {
      this.circle.setRadius(value);
    }
  }

  public onMapClick(e: LeafletMouseEvent): void {
    if (this.circle) {
      this.circle.setLatLng(e.latlng);
    } else {
      this.circle = new Circle(e.latlng, {
        color: 'blue',
        fillColor: '#20f',
        fillOpacity: 0.2,
        radius: this.radius
      }).addTo(this.map);
    }
  }

  private initMap(): void {
    this.map = new Map('map', {
      center: [52.00, -1.00], // UK
      zoom: 4
    });

    const tiles = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

}
