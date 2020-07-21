import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { AngularFireStorage} from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private http: HttpClient,
    public db: AngularFirestore,
    public afStorage: AngularFireStorage,
    public UserService: UserService,
    private afAuth: AngularFireAuth) { }

    uid: string;
    displayName: string;
    email: string;
    dialogflowURL = 'https://us-central1-mia-test-sgwxam.cloudfunctions.net/dialogflowGateway';


    userRef: AngularFirestoreDocument<any>;
    userRefData: Observable<any>;

    pathRefresh() {
      this.afAuth.authState.subscribe((user) => { // Need authState to load before all of this
        if (user) {
          this.uid = JSON.parse(localStorage.getItem('user')).uid;
          this.userRef = this.db.doc(`users/${this.uid}`);
          this.userRefData = this.userRef.valueChanges()

          this.userRefData.subscribe(data => {
            this.email = data.email;
            this.displayName = data.displayName;
          });
        }
      });
    }

    postJob(formValue) {
      return this.db.collection('jobs').add({
        title: formValue.job_title,
        titleToSearch: formValue.job_title.toLowerCase(),
        employmentType: formValue.job_type,
        location: formValue.job_location,
        salary: {low: formValue.job_salary_low, high: formValue.job_salary_high},
        requirements: formValue.job_requirements,
        responsibilities: formValue.job_responsibilities,
        description: formValue.job_description,
        orgId: JSON.parse(localStorage.getItem('orgId'))
      });
    }


  registerOrg(formValue) {
    console.log(formValue)
    return this.db.collection('companys').add({
      name: formValue.org_name,
      nameToSearch: formValue.org_name.toLowerCase(),
      logo: formValue.org_logo || "",
      location: formValue.org_location,
      values: formValue.org_values || "",
      bio: formValue.org_bio
    })
    .then(function(docRef) {
      localStorage.setItem('orgId', JSON.stringify(docRef.id));
    })
    .catch(function(error) {
      console.log(`Error retrievin document Id, ${error}`)
    })
  }

  getUserInfos() {
    this.uid = JSON.parse(localStorage.getItem('user')).uid;
    return this.db.collection('user-infos', ref => ref.where("uid", '==', this.uid)).valueChanges();
  }

  getUser(){
    this.uid = JSON.parse(localStorage.getItem('user')).uid;
    return this.db.collection('users').doc(this.uid).snapshotChanges();
  }

  getItems(userKey){
    // SEE TUTORIAL FOR WHY .snapshotChanges(); return this.db.collection('items').snapshotChanges();
    return this.db.collection('items', ref => ref.where("uid", '==', userKey)).valueChanges();

    //return this.db.collection('conversation-cards', ref => ref.where("uid", '==', userKey)).valueChanges();

  }

  upload(event) {
    this.uid = JSON.parse(localStorage.getItem('user')).uid;
    this.afStorage.upload(`/coverImages/${this.uid}`, event.target.files[0]);

    let ref = this.afStorage.ref(this.uid);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    let uploadProgress = ref.put(event.target.files[0]).percentageChanges();
    console.log('image uploaded')

  }

  searchCompany(searchValue){
    return this.db.collection('items',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .valueChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('items',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar){
    return this.db.collection('items').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }



  // MESSAGING

  messageInit() {
    this.uid = JSON.parse(localStorage.getItem('user')).uid;

    //Loading message changes on the database
    return this.db.collection("conversations").doc(this.uid).collection("Matilda");

  }

    //Prototyping function, changing from Chat with Matilda to chatting with another human.
    changeConversation() {

      this.uid = JSON.parse(localStorage.getItem('user')).uid;
      let currentTexterId = JSON.parse(localStorage.getItem('currentTexter')).jobId
      let title = JSON.parse(localStorage.getItem('currentTexter')).title
      let company = JSON.parse(localStorage.getItem('currentTexter')).company
      let location = JSON.parse(localStorage.getItem('currentTexter')).location

      let imageURL = null

      this.afStorage.ref(`/orgImages/${JSON.parse(localStorage.getItem('currentTexter')).orgId}`).getDownloadURL().toPromise().then(data => {
        //If there isn't an image, use the webflow image
        imageURL = data

        if (!imageURL) {
          imageURL = "https://uploads-ssl.webflow.com/5ea1997894e4390e5fbe12b2/5ea3164c953e8a56201c055c_icons8-target-50.png"
        }

      })

      let messages = [];

      //Load conversation if you changed the card
      let conversationRef = this.db.collection("conversations").doc(this.uid).collection(currentTexterId).get().toPromise()
        .then(snapshot => {
          snapshot.forEach(doc => {
            messages.push(doc.data())
          })

        })

      //Loading message changes on the database
      let query = this.db.collection("conversations").doc(this.uid).collection(currentTexterId);
      query.valueChanges().subscribe(data => {
        messages = data

      })

    }





  addUserMessage(text) {
    let data = {
      text,
      sender: 'Human',
      reply: true,
      richCard: false,
      date: new Date()
    }

    let ref = this.db.collection("conversations").doc(this.uid).collection("Matilda").doc(data.date.toString());
    ref.set(data);
  }

  addBotMessage(response) {
    console.log("Bot response:", response)
    this.uid = JSON.parse(localStorage.getItem('user')).uid;
    let data;
    let richCard: boolean = false;

    //If it is a normal response, not a card response
    if (response.webhookPayload == null) {

      richCard = false

      data = {
        text: response.fulfillmentText,
        sender: 'Bot',
        date: new Date(),
        richCard: false
      }

      let ref = this.db.collection("conversations").doc(this.uid).collection("Matilda").doc(data.date.toString());
      ref.set(data);

    }

    //Card response
    else {
      richCard = true
      // let arrayOfCards = [];
      let richResponse = response.webhookPayload.fields.richResponse.listValue.values;
      let arrayOfCards = []
      richResponse.forEach((value, index, array) => {
        let card = richResponse[index].structValue.fields;
        //Firestore does not support array of objects for subcollections
        let cardObject = {title: card.title,
          company: (card.company != undefined) ? card.company:null,
          logo: (card.logo != undefined) ? card.logo:null,
          employmentType: (card.employmentType != undefined) ? card.employmentType:null,
          baseSalary: (card.baseSalary != undefined) ? card.baseSalary:null,
          //hourly, weekly, monthly, annually
          salaryType: (card.salaryType != undefined) ? card.salaryType:null,
          url: (card.url != undefined) ? card.url:null,
          description: (card.description != undefined) ? card.description:null,
        };
        arrayOfCards.push(cardObject)

  })


  data = {
    sender: 'Bot',
    date: new Date(),
    richCard: true,
    cards: arrayOfCards
}

let ref = this.db.collection("conversations").doc(this.uid).collection("Matilda").doc(data.date.toString());
ref.set(data);

  }

  return richCard
  }
  // TODO: Fix learn more to be a dynamic loading animation
  addLearnMoreMessage(text) {
    let data;
    data = {
      text: text,
      sender: 'Bot',
      date: new Date(),
      richCard: false
    }

    let ref = this.db.collection("conversations").doc(this.uid).collection("Matilda").doc(data.date.toString());
    ref.set(data);

  }

  handleUserMessage(event) {
    this.uid = JSON.parse(localStorage.getItem('user')).uid;

    const text = event.message;
    this.addUserMessage(text);


    // Make the request
    return this.http.post < any > (
        this.dialogflowURL, {
          sessionId: this.uid,
          queryInput: {
            text: {
              text,
              languageCode: 'en-US'
            }
          }
        }
      )
  }




  // BOOKMARKS

  //Deprecated, bookmarkListerner does the job of bookmarkInit()
  bookmarkInit() {
    this.uid = JSON.parse(localStorage.getItem('user')).uid;
        //Load bookmarks on init
        return this.db.collection("bookmarks").doc(this.uid).collection("bookmarks").get().toPromise()

  }

  bookmarkListener() {
    this.uid = JSON.parse(localStorage.getItem('user')).uid;

      //Load bookmarks on init and listen to changes
      return this.db.collection("bookmarks").doc(this.uid).collection("bookmarks")

  }
}
