import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WCContainerComponent } from './goa-container.component';

describe('GoaContainerComponent', () => {
  let component: WCContainerComponent;
  let fixture: ComponentFixture<WCContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WCContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WCContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
