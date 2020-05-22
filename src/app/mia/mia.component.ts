import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import {
  firestore
} from 'firebase';

const dialogflowURL = 'https://us-central1-mia-test-sgwxam.cloudfunctions.net/dialogflowGateway';

@Component({
  selector: 'mia',
  templateUrl: './mia.component.html',
  styleUrls: ['./mia.component.scss']
})
export class MiaComponent implements OnInit {

  messages = [];
  loading = false;
  currentTexterId = "conversationWithMatilda";
  userId = JSON.parse(localStorage.getItem('user')).uid;
  //Later on, use
  //currentTexterId = JSON.parse(localStorage.getItem('currentTexter')).uid;


  // Random ID to maintain session with server (TO BE SWITCHED WITH USER_ID)
  sessionId = Math.random().toString(36).slice(-5);

  constructor(
    private http: HttpClient,
    public db: AngularFirestore
  ) {}

  ngOnInit() { 


    let conversationRef = this.db.collection("conversations").doc(this.userId).collection(this.currentTexterId).get().toPromise()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.messages.push(doc.data())
        })

      })



    // this.addBotMessage('Hey I\'m Matilda. Let\'s find your dream job together! Just say hi to get started.');
  }

  //Prototyping function, changing from Chat with Matilda to chatting with another human. Hard-coded Lucas.
  changeConversation() {
    this.messages = []
    this.currentTexterId = "it3gcWfiUOcAS2K1g7ciiP7aSXw1";

    let conversationRef = this.db.collection("conversations").doc(this.userId).collection(this.currentTexterId).get().toPromise()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.messages.push(doc.data())
        })

      })



  }

  // addUserMessageWithOtherUser(text) {
  //   let data = {
  //     text,
  //     sender: 'You',
  //     reply: true,
  //     date: new Date()
  //   }
  //   // this.messages.push(data);


  //   // Add message to DB (THIS WAY OF DOING THINGS REQUIRES MESSAGES TO BE ARCHIVED AS TO NOT GO OVER THE 1MB LIMIT FOR DOCS)
  //   let ref = this.db.collection("conversations").doc(this.userId).collection(this.currentTexterId).doc(data.date.toString());
  //   ref.set(data);
  //   ref.get().toPromise().then(doc => {
  //     this.messages.push(doc.data())
  //   })
  // }


  addUserMessage(text) {
    let data = {
      text,
      sender: 'Human',
      reply: true,
      date: new Date()
    }
    //removed this way of adding things locally, and rather reading each added user message from the cloud, since the date formatting was messing up.
    // this.messages.push(data);


    // Add message to DB (THIS WAY OF DOING THINGS REQUIRES MESSAGES TO BE ARCHIVED AS TO NOT GO OVER THE 1MB LIMIT FOR DOCS)
    let ref = this.db.collection("conversations").doc(this.userId).collection(this.currentTexterId).doc(data.date.toString());
    ref.set(data);
    ref.get().toPromise().then(doc => {
      this.messages.push(doc.data())
    })



    //Creating a duplicate version on the receiver's end
    //Same messages, except reply is the opposite type
    let receiverData = data
    receiverData.reply != receiverData.reply

    let refReceiver = this.db.collection("conversations").doc(this.currentTexterId).collection(this.userId).doc(receiverData.date.toString());
    refReceiver.set(receiverData);
  }

  addBotMessage(text) {
    let data = {
      text,
      sender: 'Bot',
      date: new Date()
    }
    // this.messages.push(data);


    // Add message to DB (THIS WAY OF DOING THINGS REQUIRES MESSAGES TO BE ARCHIVED AS TO NOT GO OVER THE 1MB LIMIT FOR DOCS)
    let ref = this.db.collection("conversations").doc(this.userId).collection('conversationWithMatilda').doc(data.date.toString());
    ref.set(data);
    ref.get().toPromise().then(doc => {
      this.messages.push(doc.data())
    })

  }
  ensureNotNull(variable) {
    while (variable == null) {
      setTimeout(function () {}, 500);
    }

    return variable
  }


  // Get event from ChatFormComponent
  handleUserMessage(event) {
    const text = event.message;
    this.addUserMessage(text);
    this.loading = true;

    if (this.currentTexterId.localeCompare("conversationWithMatilda") == 0) {
      //i.e. if currentTexterId is matilda, execute the fulfillment


      // Make the request
      this.http.post < any > (
          dialogflowURL, {
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
          const {
            fulfillmentText
          } = res;
          this.addBotMessage(fulfillmentText);
          this.loading = false;
        });
    }


  }


}
