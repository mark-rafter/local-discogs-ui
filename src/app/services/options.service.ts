import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private mapRadius = new BehaviorSubject<number>(3000);

  constructor() { }

  getRadius(): Observable<number> {
    return this.mapRadius.asObservable();
  }

  setRadius(value: number) {
    this.mapRadius.next(value);
  }
}
