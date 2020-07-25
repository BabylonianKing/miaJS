import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChipComponent } from './chat-chip.component';

describe('ChatChipComponent', () => {
  let component: ChatChipComponent;
  let fixture: ComponentFixture<ChatChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
