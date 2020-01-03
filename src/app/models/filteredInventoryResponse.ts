import { SellerListing } from './sellerInventory';

export interface FilteredInventoryResponse {
    sellername: string;
    avatarUrl: string;
    filteredInventory: SellerListing[];
    inventoryCount: number;
    lastUpdated: Date;
}
