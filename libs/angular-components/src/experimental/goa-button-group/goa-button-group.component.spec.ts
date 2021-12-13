import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WCButtonGroupComponent } from './goa-button-group.component';

describe('GoaButtonGroupComponent', () => {
  let component: WCButtonGroupComponent;
  let fixture: ComponentFixture<WCButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WCButtonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WCButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
