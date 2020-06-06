import { Component, OnInit, Input } from '@angular/core';
import { Chat } from 'src/shared/models/chat.model';
import { Router} from '@angular/router';

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
@Input() jobImageURL: string;
@Input() richCard: boolean;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openExternalPage() {
    window.open('https://www.facebook.com/', "_blank")
  }

  bookmarkJob() {
    console.log("Job bookmarked")
  }

}
