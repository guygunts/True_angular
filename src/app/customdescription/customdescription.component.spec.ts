import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomdescriptionComponent } from './customdescription.component';

describe('CustomdescriptionComponent', () => {
  let component: CustomdescriptionComponent;
  let fixture: ComponentFixture<CustomdescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomdescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
