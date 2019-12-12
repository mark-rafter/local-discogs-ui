import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WantlistComponent } from './wantlist.component';

describe('WantlistComponent', () => {
  let component: WantlistComponent;
  let fixture: ComponentFixture<WantlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WantlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WantlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
