import { Component } from '@angular/core';
import { OptionsService } from '../services/options.service';
import { LocalDiscogsApiService } from '../services/local-discogs-api.service';
import { StoreResponse } from '../models/storeResponse';
import { zip, EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(private optionsService: OptionsService, private apiService: LocalDiscogsApiService, private toastr: ToastrService) { }

  onSearch(): void {
    this.optionsService.setStoredValues();

    const getStores$ = zip(this.optionsService.getRadius(), this.optionsService.getLocation())
      .pipe(
        take(1),
        switchMap(
          ([mapRadius, mapLocation]) => {
            if (!mapLocation) {
              this.toastr.warning('Please select a location on the map');
              return EMPTY;
            } else {
              return this.apiService.getStoresByLocation(mapLocation.lat, mapLocation.lng, mapRadius);
            }
          }
        ));

    getStores$.subscribe((stores: StoreResponse[]) => console.log(stores));
  }

}
