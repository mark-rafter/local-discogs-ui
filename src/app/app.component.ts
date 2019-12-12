import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'local-discogs-ui';

  mapRadius: number = 3000;

  metersToKm = (value: number) => value / 1000;
}
