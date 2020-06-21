import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratelicenseComponent } from './generatelicense.component';

describe('GeneratelicenseComponent', () => {
  let component: GeneratelicenseComponent;
  let fixture: ComponentFixture<GeneratelicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratelicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratelicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
