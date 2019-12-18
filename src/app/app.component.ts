import { Component } from '@angular/core';
import { OptionsService } from './services/options.service';
import { LocalDiscogsApiService } from './services/local-discogs-api.service';
import { StoreResponse } from './models/storeResponse';
import { zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'local-discogs-ui';

  constructor(private optionsService: OptionsService, private apiService: LocalDiscogsApiService) { }

  onSearch(): void {
    this.optionsService.setStoredValues();

    const getStores$ = zip(this.optionsService.getRadius(), this.optionsService.getLocation())
      .pipe(
        switchMap(
          ([mapRadius, mapLocation]) => this.apiService.getStoresByLocation(mapLocation.lat, mapLocation.lng, mapRadius)
        ));

    getStores$.subscribe((stores: StoreResponse[]) => console.log(stores));
  }
}
