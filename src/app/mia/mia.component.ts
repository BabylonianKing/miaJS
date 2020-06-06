import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import {
  AngularFireStorage
} from '@angular/fire/storage';
import {
  firestore
} from 'firebase';
import {
  map
} from 'rxjs/operators';
import {
  MenuToggleService
} from 'src/shared/services/menu-toggle.service';

const dialogflowURL = 'https://us-central1-mia-test-sgwxam.cloudfunctions.net/dialogflowGateway';

@Component({
  selector: 'mia',
  templateUrl: './mia.component.html',
  styleUrls: ['./mia.component.scss']
})
export class MiaComponent implements OnInit {

  messages = [];
  loading = false;
  userId = JSON.parse(localStorage.getItem('user')).uid;
  jobTitle;
  currentTexterId;
  organization;
  location;
  imageURL;
  richCard;


  // Random ID to maintain session with server (TO BE SWITCHED WITH USER_ID)
  sessionId = Math.random().toString(36).slice(-5);

  constructor(
    private http: HttpClient,
    public db: AngularFirestore,
    public afStorage: AngularFireStorage,
    public sideNavService: MenuToggleService
  ) {}

  ngOnInit() {
    this.currentTexterId = JSON.parse(localStorage.getItem('currentTexter')).jobId
    this.jobTitle = JSON.parse(localStorage.getItem('currentTexter')).jobTitle
    this.organization = JSON.parse(localStorage.getItem('currentTexter')).organization
    this.location = JSON.parse(localStorage.getItem('currentTexter')).location
    this.afStorage.ref(`/orgImages/${JSON.parse(localStorage.getItem('currentTexter')).orgId}`).getDownloadURL().toPromise().then(data => {
      //If there isn't an image, use the webflow image
      // this.imageURL = data

      if (!this.imageURL) {
        this.imageURL = "https://uploads-ssl.webflow.com/5ea1997894e4390e5fbe12b2/5ea3164c953e8a56201c055c_icons8-target-50.png"
      }

    })



    //Quick-fix for MVP
    this.currentTexterId = "Matilda";

    // if (!this.currentTexterId) {
    //   this.currentTexterId = "conversationWithMatilda";
    // }

    //Load conversation history on init
    let conversationRef = this.db.collection("conversations").doc(this.userId).collection(this.currentTexterId).get().toPromise()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.messages.push(doc.data())
        })
      })

    //Loading message changes on the database
    let query = this.db.collection("conversations").doc(this.userId).collection(this.currentTexterId);
    query.valueChanges().subscribe(data => {
      // this.messages = [];
      // this.messages.push(data.values);
      this.messages = data

      // this.db.collection("conversation-cards").doc(this.userId).collection(this.currentTexterId).set(data[-1]


    })



    // let observer = query.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     console.log("Obtained Data")
    //     const data = a.payload.doc.data();
    //     return data  
    //   }))
    // )
    // console.log(observer)




    // this.addBotMessage('Hey I\'m Matilda. Let\'s find your dream job together! Just say hi to get started.');
  }

  //Prototyping function, changing from Chat with Matilda to chatting with another human. Hard-coded Lucas.
  changeConversation() {
    this.currentTexterId = JSON.parse(localStorage.getItem('currentTexter')).jobId
    this.jobTitle = JSON.parse(localStorage.getItem('currentTexter')).jobTitle
    this.organization = JSON.parse(localStorage.getItem('currentTexter')).organization
    this.location = JSON.parse(localStorage.getItem('currentTexter')).location

    this.imageURL = null

    this.afStorage.ref(`/orgImages/${JSON.parse(localStorage.getItem('currentTexter')).orgId}`).getDownloadURL().toPromise().then(data => {
      //If there isn't an image, use the webflow image
      this.imageURL = data

      if (!this.imageURL) {
        this.imageURL = "https://uploads-ssl.webflow.com/5ea1997894e4390e5fbe12b2/5ea3164c953e8a56201c055c_icons8-target-50.png"
      }

    })

    console.log(this.currentTexterId)
    this.messages = [];


    //Load conversation if you changed the card
    let conversationRef = this.db.collection("conversations").doc(this.userId).collection(this.currentTexterId).get().toPromise()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.messages.push(doc.data())
        })

      })

    //Loading message changes on the database
    let query = this.db.collection("conversations").doc(this.userId).collection(this.currentTexterId);
    query.valueChanges().subscribe(data => {
      // this.messages = [];
      // this.messages.push(data.values);
      this.messages = data

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
    //Should remove this code, creates duplicate texts on the client side
    // ref.get().toPromise().then(doc => {
    //   this.messages.push(doc.data())
    // })

    //No need for duplicates, since it is a bot all the time
    // //Creating a duplicate version on the receiver's end
    // //Same messages, except reply is the opposite type
    // let receiverData = data
    // receiverData.reply = false

    // let refReceiver = this.db.collection("conversations").doc(this.currentTexterId).collection(this.userId).doc(receiverData.date.toString());
    // refReceiver.set(receiverData);



  }

  addBotMessage(response) {
    let title;
    let subtitle;
    let text;
    let url;

    let data;

    //If it is a normal response, not a card response
    if (response.fulfillmentText != "") {
      text = response.fulfillmentText
    }

    //Card response
    else {
      title = response.fulfillmentMessages[0].card.title
      subtitle = response.fulfillmentMessages[0].card.subtitle
      text = response.fulfillmentMessages[0].message
      url = response.fulfillmentMessages[0].card.imageUri
    }

    if (url != null) {
      data = {
        text: text,
        title: title,
        subtitle: subtitle,
        sender: 'Bot',
        date: new Date(),
        url: url,
        richCard: true
      }

    } else {
      data = {
        text: text,
        sender: 'Bot',
        date: new Date(),
        richCard: false
      }
    }

    // this.messages.push(data);


    // Add message to DB (THIS WAY OF DOING THINGS REQUIRES MESSAGES TO BE ARCHIVED AS TO NOT GO OVER THE 1MB LIMIT FOR DOCS)
    let ref = this.db.collection("conversations").doc(this.userId).collection(this.currentTexterId).doc(data.date.toString());
    ref.set(data);
    // ref.get().toPromise().then(doc => {
    //   this.messages.push(doc.data())

    // })

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

    //Code commented below, since removing messaging functionality
    this.addUserMessage(text);

    //i.e. if currentTexterId is matilda, execute the fulfillment

    this.loading = true;


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
        console.log(res)

        this.addBotMessage(res);
        this.loading = false;
      });



  }


}
