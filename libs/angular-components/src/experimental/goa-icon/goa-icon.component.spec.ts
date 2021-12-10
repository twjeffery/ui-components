import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoaIconComponent } from './goa-icon.component';

describe('GoaIconComponent', () => {
  let component: GoaIconComponent;
  let fixture: ComponentFixture<GoaIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoaIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
