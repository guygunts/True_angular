import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustSpeedComponent } from './adjust-speed.component';

describe('AdjustSpeedComponent', () => {
  let component: AdjustSpeedComponent;
  let fixture: ComponentFixture<AdjustSpeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustSpeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
