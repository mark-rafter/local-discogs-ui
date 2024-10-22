import { Component } from '@angular/core';
import { OptionsService } from '../services/options.service';
import { LocalDiscogsApiService } from '../services/local-discogs-api.service';
import { StoreResponse } from '../models/storeResponse';
import { zip, EMPTY, Observable } from 'rxjs';
import { switchMap, take, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchBtnOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Search local stores',
    raised: true,
    stroked: true,
    buttonColor: 'primary',
    barColor: 'accent',
    mode: 'determinate',
    value: 0
  };

  stores$: Observable<StoreResponse[]>;

  wantlistUsername: string;

  constructor(private optionsService: OptionsService, private apiService: LocalDiscogsApiService, private toastr: ToastrService) { }

  onSearch(): void {
    this.searchBtnOptions.active = true;

    this.optionsService.setStoredValues();

    this.stores$ = zip(this.optionsService.getRadius(), this.optionsService.getLocation(), this.optionsService.getWantlistUsername())
      .pipe(
        finalize(() => this.searchBtnOptions.active = false),
        take(1),
        switchMap(
          ([mapRadius, mapLocation, wantlistUsername]) => {
            if (!mapLocation) {
              this.toastr.warning('Please select a location on the map');
              return EMPTY;
            } else if (!wantlistUsername) {
              this.toastr.warning('Please enter a wantlist username');
              return EMPTY;
            } else {
              this.wantlistUsername = wantlistUsername;
              return this.apiService.getStoresByLocation(mapLocation.lat, mapLocation.lng, mapRadius);
            }
          }
        ));
  }

}
