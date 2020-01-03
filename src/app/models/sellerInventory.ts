export class SellerInventory {
    username: string;
    avatarUrl: string;
    inventory: SellerListing[];
    lastUpdated: Date;
}

export class SellerListing {
    id: number;
    description: string;
    condition: string;
    sleeveCondition: string;
    posted: Date;
    price: string;
    releaseId: number;
}
