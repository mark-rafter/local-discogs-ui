import { Component, OnInit, Input } from '@angular/core';
import { StoreResponse } from 'src/app/models/storeResponse';
import { LocalDiscogsApiService } from 'src/app/services/local-discogs-api.service';
import { Observable } from 'rxjs';
import { FilteredInventoryResponse } from 'src/app/models/filteredInventoryResponse';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  @Input() store: StoreResponse;
  @Input() wantlistUsername: string;

  inventoryResponse$: Observable<FilteredInventoryResponse>;

  listingColumns = ['id', 'description', 'condition', 'sleeveCondition', 'posted', 'price'];

  constructor(private apiService: LocalDiscogsApiService) { }

  ngOnInit() {
    this.inventoryResponse$ = this.apiService.getFilteredInventory(this.store.sellername, this.wantlistUsername);
  }

}
