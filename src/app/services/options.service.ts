import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LatLng } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private mapRadius = new BehaviorSubject<number>(3000);
  private mapLocation = new Subject<LatLng>();

  constructor() { }

  getRadius(): Observable<number> {
    return this.mapRadius.asObservable();
  }

  setRadius(value: number) {
    this.mapRadius.next(value);
  }

  getLocation(): Observable<LatLng> {
    return this.mapLocation.asObservable();
  }

  setLocation(value: LatLng) {
    this.mapLocation.next(value);
  }
}
