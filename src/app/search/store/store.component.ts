import { Component, OnInit, Input } from '@angular/core';
import { StoreResponse } from 'src/app/models/storeResponse';
import { LocalDiscogsApiService } from 'src/app/services/local-discogs-api.service';
import { Observable } from 'rxjs';
import { SellerInventory } from 'src/app/models/sellerInventory';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  @Input() store: StoreResponse;

  sellerInventory$: Observable<SellerInventory>;

  listingColumns = ['id', 'description', 'condition', 'sleeveCondition', 'posted', 'price'];

  constructor(private apiService: LocalDiscogsApiService) { }

  ngOnInit() {
    this.sellerInventory$ = this.apiService.getInventory(this.store.sellername);
  }

}
