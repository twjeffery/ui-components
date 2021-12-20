import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WCCalloutComponent } from './goa-callout.component';

describe('WCCalloutComponent', () => {
  let component: WCCalloutComponent;
  let fixture: ComponentFixture<WCCalloutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WCCalloutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WCCalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
