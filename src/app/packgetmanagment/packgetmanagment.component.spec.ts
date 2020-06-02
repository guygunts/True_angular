import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackgetmanagmentComponent } from './packgetmanagment.component';

describe('PackgetmanagmentComponent', () => {
  let component: PackgetmanagmentComponent;
  let fixture: ComponentFixture<PackgetmanagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackgetmanagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackgetmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
