import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LatLng } from 'leaflet';
import { LOCAL_STORAGE, StorageService, isStorageAvailable } from 'ngx-webstorage-service';
import { Options } from '../models/options';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private mapRadius = new BehaviorSubject<number>(3000);
  private mapLocation = new BehaviorSubject<LatLng>(undefined);

  private wantlistUsername = new BehaviorSubject<string>(undefined);

  private localStorageAvailable: boolean;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.localStorageAvailable = isStorageAvailable(localStorage);
    this.retrieveStoredValues();
  }

  private retrieveStoredValues() {
    if (this.localStorageAvailable) {
      const options: Options = this.storage.get('options');

      if (options) {
        this.mapRadius.next(options.mapRadius);
        this.mapLocation.next(options.mapLocation);
        this.wantlistUsername.next(options.wantlistUsername);
      }
    }
  }

  public setStoredValues(): void {
    if (this.localStorageAvailable) {
      const options: Options = new Options();

      // todo: test
      // const options$ = zip(this.mapRadius, this.mapLocation, this.wantlistUsername)
      //   .pipe(
      //     map(
      //       ([mapRadius, mapLocation, wantlistUsername]) => {
      //         const op: Options = { mapRadius, mapLocation, wantlistUsername };
      //         return op;
      //       }
      //     ));

      // options$.subscribe(o => this.storage.set('options', o));

      this.mapRadius.pipe(take(1)).subscribe(obs => options.mapRadius = obs);
      this.mapLocation.pipe(take(1)).subscribe(obs => options.mapLocation = obs);
      this.wantlistUsername.pipe(take(1)).subscribe(obs => options.wantlistUsername = obs);

      this.storage.set('options', options);
    }
  }

  getRadius = (): Observable<number> => this.mapRadius.asObservable();
  setRadius = (value: number) => this.mapRadius.next(value);

  getLocation = (): Observable<LatLng> => this.mapLocation.asObservable();
  setLocation = (value: LatLng) => this.mapLocation.next(value);

  getWantlistUsername = (): Observable<string> => this.wantlistUsername.asObservable();
  setWantlistUsername = (value: string) => this.wantlistUsername.next(value);
}
