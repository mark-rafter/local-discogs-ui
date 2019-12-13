import { Component } from '@angular/core';
import { OptionsService } from './services/options.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'local-discogs-ui';

  constructor(private optionsService: OptionsService) { }

  onSearch() {
    this.optionsService.setStoredValues();
  }
}
