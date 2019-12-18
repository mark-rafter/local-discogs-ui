import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../services/options.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wantlist',
  templateUrl: './wantlist.component.html',
  styleUrls: ['./wantlist.component.scss']
})
export class WantlistComponent implements OnInit {
  username$: Observable<string>;

  constructor(private optionsService: OptionsService) { }

  ngOnInit(): void {
    this.username$ = this.optionsService.getWantlistUsername();
  }

  updateUsername(value: string): void {
    this.optionsService.setWantlistUsername(value);
  }

  onFetch(): void {
    // todo: call API. return:
    // {username} does not exist / wantlist is set to private
    // {username}'s wantlist contains {count} items. Last updated: {datetime}
  }

}
