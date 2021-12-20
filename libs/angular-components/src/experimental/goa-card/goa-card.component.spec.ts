import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WCCardComponent } from './goa-card.component';

describe('GoaCardComponent', () => {
  let component: WCCardComponent;
  let fixture: ComponentFixture<WCCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WCCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WCCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
