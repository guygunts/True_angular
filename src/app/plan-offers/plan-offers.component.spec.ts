import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanOffersComponent } from './plan-offers.component';

describe('PlanOffersComponent', () => {
  let component: PlanOffersComponent;
  let fixture: ComponentFixture<PlanOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
