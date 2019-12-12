import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LatLng } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private mapRadius = new BehaviorSubject<number>(3000);
  private mapLocation = new Subject<LatLng>();

  private wantlistUsername = new Subject<string>();

  constructor() { }

  getRadius = (): Observable<number> => this.mapRadius.asObservable();
  setRadius = (value: number) => this.mapRadius.next(value);

  getLocation = (): Observable<LatLng> => this.mapLocation.asObservable();
  setLocation = (value: LatLng) => this.mapLocation.next(value);

  getWantlistUsername = (): Observable<string> => this.wantlistUsername.asObservable();
  setWantlistUsername = (value: string) => this.wantlistUsername.next(value);
}
