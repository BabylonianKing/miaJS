import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chat } from 'src/shared/models/chat.model';
import { Router} from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';
import { CrudService } from 'src/shared/services/crud.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';


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

messageImage;
totalCardCount = 5;


@Output() descriptionEmitter = new EventEmitter<string>();
userId = JSON.parse(localStorage.getItem('user')).uid;


  constructor(
    private router: Router,
    public afStorage: AngularFireStorage,
    public db: AngularFirestore,
    public menu: MenuToggleService,
    public crudService: CrudService,
    public analytics: AngularFireAnalytics
    ) { }

  ngOnInit(): void {
    try {
      this.cards.forEach(card => {
      card.heartFilled = false
    })

    if (this.message.startsWith("https")) {
      this.messageImage = true;
    }

  } catch {}



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

  showMoreJobs() {
    this.totalCardCount += 5

  }


}
