import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatildaDashboardComponent } from './matilda-dashboard.component';

describe('MatildaDashboardComponent', () => {
  let component: MatildaDashboardComponent;
  let fixture: ComponentFixture<MatildaDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatildaDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatildaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
