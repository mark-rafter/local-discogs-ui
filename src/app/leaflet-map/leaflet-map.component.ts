import { Component, AfterViewInit } from '@angular/core';
import { Map, Circle, TileLayer, LeafletMouseEvent } from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit {
  private map: Map;
  private circle: Circle;

  constructor() { }

  ngAfterViewInit() {
    this.initMap();
    this.map.on('click', (e: LeafletMouseEvent) => this.onMapClick(e));
  }

  public onMapClick(e: LeafletMouseEvent): void {
    if (this.circle) {
      this.circle.setLatLng(e.latlng);
    } else {
      this.circle = new Circle(e.latlng, {
        color: 'red',
        fillColor: '#30f',
        fillOpacity: 0.4,
        radius: 3000
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
