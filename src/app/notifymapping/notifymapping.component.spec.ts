import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifymappingComponent } from './notifymapping.component';

describe('NotifymappingComponent', () => {
  let component: NotifymappingComponent;
  let fixture: ComponentFixture<NotifymappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifymappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifymappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
