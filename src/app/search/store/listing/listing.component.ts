import { Component, OnInit, Input } from '@angular/core';
import { SellerListing } from 'src/app/models/sellerInventory';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent {
  @Input() listing: SellerListing;

  constructor() { }

}
