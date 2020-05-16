import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

const dialogflowURL = 'https://us-central1-mia-test-sgwxam.cloudfunctions.net/dialogflowGateway';

@Component({
  selector: 'mia',
  templateUrl: './mia.component.html',
  styleUrls: ['./mia.component.scss']
})
export class MiaComponent implements OnInit {

  messages = [];
  loading = false;

  // Random ID to maintain session with server (TO BE SWITCHED WITH USER_ID)
  sessionId = Math.random().toString(36).slice(-5);

  constructor(
    private http: HttpClient,
    public db: AngularFirestore
    ) { }

  ngOnInit() {
    this.addBotMessage('Hey I\'m Matilda. Let\'s find your dream job together! Just say hi to get started.');
  }

  // Get event from ChatFormComponent
  handleUserMessage(event) {
    console.log(event.message);
    const text = event.message;
    this.addUserMessage(text);

    this.loading = true;

    // Make the request
    this.http.post<any>(
      dialogflowURL,
      {
        sessionId: this.sessionId,
        queryInput: {
          text: {
            text,
            languageCode: 'en-US'
          }
        }
      }
    )
    .subscribe(res => {
      const { fulfillmentText } = res;
      this.addBotMessage(fulfillmentText);
      this.loading = false;
    });
  }

  addUserMessage(text) {
    this.messages.push({
      text,
      sender: 'You',
      reply: true,
      date: new Date().toDateString()
    });
    // Add message to DB (THIS WAY OF DOING THINGS REQUIRES MESSAGES TO BE ARCHIVED AS TO NOT GO OVER THE 1MB LIMIT FOR DOCS)
    let ref = this.db.collection("conversations").doc("k3HsegZvOBeJiYX8d67I");
    ref.update({messages: firestore.FieldValue.arrayUnion(text)});
  }

  addBotMessage(text) {
    this.messages.push({
      text,
      sender: 'Bot',
      date: new Date().toDateString()
    });

    // Add message to DB (THIS WAY OF DOING THINGS REQUIRES MESSAGES TO BE ARCHIVED AS TO NOT GO OVER THE 1MB LIMIT FOR DOCS)
    let ref = this.db.collection("conversations").doc("k3HsegZvOBeJiYX8d67I");
    ref.update({messages: firestore.FieldValue.arrayUnion(text)});
  }

}
