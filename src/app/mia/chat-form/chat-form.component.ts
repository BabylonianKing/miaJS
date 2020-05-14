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

  // Triggered on form submit
  sendForm(form: NgForm) {
    // Sends event to MiaComponent
    this.send.emit(form.value);
    // Resets form placeholder
    form.reset();
  }
}
