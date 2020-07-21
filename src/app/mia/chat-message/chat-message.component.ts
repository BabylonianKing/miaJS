import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chat } from 'src/shared/models/chat.model';
import { Router} from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})

export class ChatMessageComponent implements OnInit {

// Content
@Input() message: string;
@Input() richCard: boolean;
@Input() timestamp: string;
@Input() cards: string;
@Input() reply: boolean;
@Output() descriptionEmitter = new EventEmitter<string>();
userId = JSON.parse(localStorage.getItem('user')).uid;


  constructor(private router: Router,
    public afStorage: AngularFireStorage,
    public db: AngularFirestore,
    ) { }

  ngOnInit(): void {
  }

}
