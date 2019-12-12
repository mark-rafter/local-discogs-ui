import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Map, Circle, TileLayer, LeafletMouseEvent } from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit, OnChanges {
  private map: Map;
  private circle: Circle;

  @Input() radius: number;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    this.map.on('click', (e: LeafletMouseEvent) => this.onMapClick(e));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.circle) {
      this.circle.setRadius(this.radius);
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
