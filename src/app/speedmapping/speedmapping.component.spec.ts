import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedmappingComponent } from './speedmapping.component';

describe('SpeedmappingComponent', () => {
  let component: SpeedmappingComponent;
  let fixture: ComponentFixture<SpeedmappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedmappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
