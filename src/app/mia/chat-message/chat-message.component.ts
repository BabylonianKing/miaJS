import { Component, OnInit, Input } from '@angular/core';
import { Chat } from 'src/shared/models/chat.model'

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

// Content 
@Input() message: string;
@Input() timestamp: string;
// Style (Bot vs. User Bubble)
@Input() reply: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
