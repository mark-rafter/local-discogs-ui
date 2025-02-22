import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressButtonsModule } from 'mat-progress-buttons';

import { LeafletMapComponent } from './location/leaflet-map/leaflet-map.component';
import { LocationComponent } from './location/location.component';
import { WantlistComponent } from './wantlist/wantlist.component';
import { SearchComponent } from './search/search.component';
import { StoreComponent } from './search/store/store.component';
import { ListingComponent } from './search/store/listing/listing.component';
import { MatProgressSpinnerModule, MatTableModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LeafletMapComponent,
    LocationComponent,
    WantlistComponent,
    SearchComponent,
    StoreComponent,
    ListingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      closeButton: true
    }),
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatProgressButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
