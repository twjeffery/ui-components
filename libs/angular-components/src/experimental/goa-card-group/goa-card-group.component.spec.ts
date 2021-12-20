import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoaCardGroupComponent } from './goa-card-group.component';

describe('GoaCardGroupComponent', () => {
  let component: GoaCardGroupComponent;
  let fixture: ComponentFixture<GoaCardGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoaCardGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoaCardGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
