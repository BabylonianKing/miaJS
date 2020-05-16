import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvoInfoComponent } from './convo-info.component';

describe('ConvoInfoComponent', () => {
  let component: ConvoInfoComponent;
  let fixture: ComponentFixture<ConvoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
