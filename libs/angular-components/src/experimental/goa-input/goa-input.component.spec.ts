import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoaInputComponent } from './goa-input.component';

describe('GoaInputComponent', () => {
  let component: GoaInputComponent;
  let fixture: ComponentFixture<GoaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoaInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
