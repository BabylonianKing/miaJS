import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvoCardComponent } from './convo-card.component';

describe('ConvoCardComponent', () => {
  let component: ConvoCardComponent;
  let fixture: ComponentFixture<ConvoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
