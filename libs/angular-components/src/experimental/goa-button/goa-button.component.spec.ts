import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WCButtonComponent } from './goa-button.component';

describe('GoaButtonComponent', () => {
  let component: WCButtonComponent;
  let fixture: ComponentFixture<WCButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WCButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WCButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
