import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, Circle, TileLayer, LeafletMouseEvent, LatLng } from 'leaflet';
import { OptionsService } from '../../services/options.service';
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
export class LeafletMapComponent implements AfterViewInit, OnDestroy {

  private map: Map;
  private mapInited: boolean = false;
  private circle: Circle;

  private radius: number;
  private location: LatLng;

  private subscription = new Subscription();

  constructor(private optionsService: OptionsService) { }

  ngAfterViewInit(): void {
    this.initMap();

    this.subscription.add(
      this.optionsService.getRadius().subscribe((radius: number) => {
        this.radius = radius;
        this.updateCircleRadius();
      })
    );

    this.subscription.add(
      this.optionsService.getLocation().subscribe((location: LatLng) => {
        this.location = location;
        if (this.location) {
          this.updateCircleLocation();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateCircleRadius(): void {
    if (this.circle) {
      this.circle.setRadius(this.radius);
    }
  }

  private updateCircleLocation(): void {
    if (this.circle) {
      this.circle.setLatLng(this.location);
    } else if (this.mapInited) {
      this.circle = new Circle(this.location, {
        color: 'blue',
        fillColor: '#20f',
        fillOpacity: 0.2,
        radius: this.radius
      }).addTo(this.map);
    }

    // this.map.panTo([this.location.lat, this.location.lng]); // bugged in firefox?
  }

  public onMapClick(e: LeafletMouseEvent): void {
    this.optionsService.setLocation(e.latlng);
  }

  private initMap(): void {
    this.map = new Map('map', {
      center: [52.0, -1.0], // UK
      zoom: 4
    });

    const tiles = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.on('click', (e: LeafletMouseEvent) => this.onMapClick(e));

    this.mapInited = true;
  }

}
