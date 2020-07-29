import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chat } from 'src/shared/models/chat.model';
import { Router} from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';
import { CrudService } from 'src/shared/services/crud.service';


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


@Output() descriptionEmitter = new EventEmitter<string>();
userId = JSON.parse(localStorage.getItem('user')).uid;


  constructor(
    private router: Router,
    public afStorage: AngularFireStorage,
    public db: AngularFirestore,
    public menu: MenuToggleService,
    public crudService: CrudService
    ) { }

  ngOnInit(): void {
    try {
      this.cards.forEach(card => {
      card.heartFilled = false
    });}
    catch {}

    if (this.message.startsWith("http")) {
      this.messageImage = true
    }


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
