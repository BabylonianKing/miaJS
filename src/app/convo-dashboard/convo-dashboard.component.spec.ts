import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvoDashboardComponent } from './convo-dashboard.component';

describe('ConvoDashboardComponent', () => {
  let component: ConvoDashboardComponent;
  let fixture: ComponentFixture<ConvoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
