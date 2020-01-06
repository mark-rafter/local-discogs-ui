import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { StoreResponse } from '../models/storeResponse';
import { SellerInventory } from '../models/sellerInventory';
import { FilteredInventoryResponse } from '../models/filteredInventoryResponse';

@Injectable({
  providedIn: 'root'
})
export class LocalDiscogsApiService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getStoresByLocation(lat: number, lng: number, radius: number): Observable<StoreResponse[]> {
    return this.http.get<StoreResponse[]>(
      environment.apiUrl + `store/by-location?lat=${lat}&lng=${lng}&radius=${radius}`)
      .pipe(
        catchError(err => throwError(this.errorHandling(err)))
      );
  }

  getInventory(sellername: string): Observable<SellerInventory> {
    return this.http.get<SellerInventory>(
      environment.apiUrl + `inventory/${sellername}`)
      .pipe(
        catchError(err => throwError(this.errorHandling(err)))
      );
  }

  getFilteredInventory(sellername: string, wantlistUsername: string): Observable<FilteredInventoryResponse> {
    return this.http.get<FilteredInventoryResponse>(
      environment.apiUrl + `inventory/in-wantlist?sellername=${sellername}&wantlistUsername=${wantlistUsername}`)
      .pipe(
        catchError(err => throwError(this.errorHandling(err)))
      );
  }

  private errorHandling(error: any) {
    this.toastr.error(`${error.message} - ${error.error ? error.error.message : error.message}`, `Error - ${error.statusText}`);
    if (error instanceof HttpErrorResponse) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
  }
}
