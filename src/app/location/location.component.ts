import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../services/options.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  radius$: Observable<number>;

  constructor(private optionsService: OptionsService) { }

  ngOnInit(): void {
    this.radius$ = this.optionsService.getRadius();
  }

  updateRadius(value: number) {
    this.optionsService.setRadius(value);
  }

  metersToKm = (value: number) => value / 1000;

}
