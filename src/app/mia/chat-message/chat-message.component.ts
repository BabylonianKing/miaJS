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


@Input() learnMoreDescription: string;
@Input() applyNowUrl: string;
@Input() imageUrl: string;
@Input() reply: boolean;
@Input() jobImageURL: string;
@Input() richCard: boolean;
// @Input() jobTitle: string;
// @Input() jobSubtitle: boolean;
@Input() cards: string;
@Input() company: string;
@Input() title: string;
@Input() description: string;
@Input() baseSalary: any;
@Input() salaryType: string;
@Input() employmentType: string;
@Input() logo: string;
@Input() url: string;

@Output() descriptionEmitter = new EventEmitter<string>();
userId = JSON.parse(localStorage.getItem('user')).uid;


  constructor(private router: Router,
    public afStorage: AngularFireStorage,
    public db: AngularFirestore,
    ) { }

  ngOnInit(): void {
  }

  heartFilled: boolean = false;

  bookmarkJob() {
    this.heartFilled = true;
    let data = {
      description: this.description,
      url: this.url,
      logo: this.logo,
      // jobImageURL: this.jobImageURL,
      title: this.title,
      company: this.company,
      employmentType: this.employmentType,
      salary: this.baseSalary,
      //hourly, weekly, monthly, annually
      salaryType: this.salaryType,


    }

    let ref = this.db.collection("bookmarks").doc(this.userId).collection("bookmarks")
    ref.add(data);
  }

  //TODO: Code this functionality
  learnMore() {
    this.descriptionEmitter.emit(this.description)
    console.log(this.description)
  }

  apply() {
    window.open(this.applyNowUrl, "_blank")

  }

}
