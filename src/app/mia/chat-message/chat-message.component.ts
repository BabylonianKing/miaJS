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
@Input() timestamp: string;
// Style (Bot vs. User Bubble)
@Input() learnMoreDescription: string;
@Input() applyNowUrl: string;
@Input() imageUrl: string;
@Input() reply: boolean;
@Input() jobImageURL: string;
@Input() richCard: boolean;
@Input() jobTitle: string;
@Input() jobSubtitle: boolean;

@Output() learnMoreDescriptionEmitter = new EventEmitter<string>(); 
userId = JSON.parse(localStorage.getItem('user')).uid;




  constructor(private router: Router,
    public afStorage: AngularFireStorage,
    public db: AngularFirestore,
    ) { }

  ngOnInit(): void {
  }

  bookmarkJob() {
    console.log("Job bookmarked")
    let data = {
      learnMoreDescription: this.learnMoreDescription,
      applyNowUrl: this.applyNowUrl,
      imageUrl: this.imageUrl,
      // jobImageURL: this.jobImageURL,
      jobTitle: this.jobTitle,
      jobSubtitle: this.jobSubtitle,    }

    let ref = this.db.collection("bookmarks").doc(this.userId).collection("bookmarks")
    ref.add(data);
  }
  learnMore() {
    this.learnMoreDescriptionEmitter.emit(this.learnMoreDescription)
    console.log(this.learnMoreDescription)
  }

  apply() {
    window.open(this.applyNowUrl, "_blank")

  }

}
