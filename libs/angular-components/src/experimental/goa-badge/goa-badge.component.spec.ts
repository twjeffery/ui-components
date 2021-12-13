import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WCBadgeComponent } from './goa-badge.component';

describe('WCBadgeComponent', () => {
  let component: WCBadgeComponent;
  let fixture: ComponentFixture<WCBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WCBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WCBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
