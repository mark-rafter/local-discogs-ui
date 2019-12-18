import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { StoreResponse } from '../models/storeResponse';

@Injectable({
  providedIn: 'root'
})
export class LocalDiscogsApiService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getStoresByLocation(lat: number, lng: number, radius: number): Observable<StoreResponse[]> {
    return this.http.get<StoreResponse[]>(
      environment.apiUrl + `store/by-location?lat=${lat}&lng=${lng}&radius=${radius}`, {}).pipe(
        retry(1),
        catchError(err => throwError(this.errorHandling(err)))
      );
  }

  protected errorHandling(error: any) {
    this.toastr.error(`${error.message} - ${error.error ? error.error.message : error.message}`, `Error - ${error.statusText}`, {
      timeOut: 15000
    });
    if (error instanceof HttpErrorResponse) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
  }
}
