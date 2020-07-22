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

@Input() imageUrl: string;
@Input() reply: boolean;
@Input() richCard: boolean;
// @Input() jobTitle: string;
// @Input() jobSubtitle: boolean;
@Input() cards: any;


@Output() descriptionEmitter = new EventEmitter<string>();
userId = JSON.parse(localStorage.getItem('user')).uid;


  constructor(private router: Router,
    public afStorage: AngularFireStorage,
    public db: AngularFirestore,
    ) { }

  ngOnInit(): void {
    try {
      this.cards.forEach(card => {
      card.heartFilled = false
    });}
    catch {}

  }



  // TODO: Fix this
  bookmarkJob(card) {
    card.heartFilled = true;
    let data = {
      description: card.description,
      url: card.url,
      logo: card.logo,
      location: card.location,
      title: card.title,
      company: card.company,
      employmentType: card.employmentType,
      baseSalary: card.baseSalary,
      //hourly, weekly, monthly, annually
      salaryType: card.salaryType,
      score: card.score,
      jobId: card.jobId


    }

    let ref = this.db.collection("bookmarks").doc(this.userId).collection("bookmarks").doc(card.jobId.stringValue)
    ref.set(data);
  }


  formatBaseSalary(baseSalary, salaryType) {

    try {
      return baseSalary.numberValue.toFixed(2).toString() + "$ " + salaryType
    } catch {
      return baseSalary.stringValue
    }

  }


  formatDescription(description) {
    let previewDescription: any = Object.values(description)[0]
    previewDescription = previewDescription.stringValue
    return previewDescription
  }

  //TODO: Code this functionality
  learnMore(description) {
    this.descriptionEmitter.emit(description)
  }

  apply(url) {
    window.open(url, "_blank")

  }

}
