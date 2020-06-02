import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpackgetComponent } from './listpackget.component';

describe('ListpackgetComponent', () => {
  let component: ListpackgetComponent;
  let fixture: ComponentFixture<ListpackgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpackgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpackgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
