import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chat } from 'src/shared/models/chat.model';

@Component({
  selector: 'chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {

  @Input() message: Chat = new Chat("");
  @Output() send: EventEmitter<Chat> = new EventEmitter<Chat>();

  constructor() { }

  ngOnInit(): void {
  }

  // GOOD SO FAR (I THINK)
  sendForm(form: NgForm) {
    this.send.emit(form.value);
  }
}
