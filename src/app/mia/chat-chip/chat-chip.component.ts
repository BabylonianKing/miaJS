import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat-chip',
  templateUrl: './chat-chip.component.html',
  styleUrls: ['./chat-chip.component.scss']
})
export class ChatChipComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
