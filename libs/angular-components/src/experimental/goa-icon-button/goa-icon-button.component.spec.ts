import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoaIconButtonComponent } from './goa-icon-button.component';

describe('GoaIconButtonComponent', () => {
  let component: GoaIconButtonComponent;
  let fixture: ComponentFixture<GoaIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoaIconButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoaIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
