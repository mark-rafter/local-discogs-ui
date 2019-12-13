import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalDiscogsApiService {

  constructor(protected toastr: ToastrService) { }

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
