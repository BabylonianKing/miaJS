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
    return this.db.collection('users', ref => ref.where("uid", '==', this.uid)).valueChanges();
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
        let cardObject = {
          title: card.title,
          location: (card.location != undefined) ? card.location:null,
          company: (card.company != undefined) ? card.company:null,
          logo: (card.logo != undefined) ? card.logo:null,
          employmentType: (card.employmentType != undefined) ? card.employmentType:null,
          baseSalary: (card.baseSalary != undefined) ? card.baseSalary:null,
          //hourly, weekly, monthly, annually
          salaryType: (card.salaryType != undefined) ? card.salaryType:null,
          url: (card.url != undefined) ? card.url:null,
          description: (card.description != undefined) ? card.description:null,
          score: (card.score != undefined) ? card.score:null,
          jobId: (card.jobId != undefined) ? card.jobId:null,

        };
        arrayOfCards.push(cardObject)

  })

  let ref;
  console.log(richResponse)
  //If match results in no jobs found
  if (richResponse.length == 0) {
    data = {
      sender: 'Bot',
      date: new Date(),
      richCard: false,
      text: "Sorry, we didn't find any jobs for you :("
  }
  ref = this.db.collection("conversations").doc(this.uid).collection("Matilda").doc(data.date.toString());
  ref.set(data);

  this.delay(2000).then(content => {
    data = {
      sender: 'Bot',
      date: new Date(),
      richCard: false,
      text: "Would you like to try again?"
  }

  ref = this.db.collection("conversations").doc(this.uid).collection("Matilda").doc(data.date.toString());
  ref.set(data);

  })

  } else {
    data = {
      sender: 'Bot',
      date: new Date(),
      richCard: false,
      text: "Here are the jobs I found for you."
  }



  ref = this.db.collection("conversations").doc(this.uid).collection("Matilda").doc(data.date.toString());
  ref.set(data);

  this.delay(2000).then(content => {
    data = {
      sender: 'Bot',
      date: new Date(),
      richCard: true,
      cards: arrayOfCards
  }

    ref = this.db.collection("conversations").doc(this.uid).collection("Matilda").doc(data.date.toString());
    ref.set(data);

    this.delay(2000).then(content => {
      data = {
        sender: 'Bot',
        date: new Date(),
        richCard: false,
        text: "Hopefully you find an interesting opportunity! If not, we can always look for something else."
    }

      ref = this.db.collection("conversations").doc(this.uid).collection("Matilda").doc(data.date.toString());
      ref.set(data);

    })

  })

  }


  }
  return richCard
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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
  //There might be a more cost effective way of doing this
  newJobSearch() {
    this.uid = JSON.parse(localStorage.getItem('user')).uid;
    this.db.collection("conversations").doc(this.uid).collection("Matilda").get().toPromise().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id)
        this.db.collection("conversations").doc(this.uid).collection("Matilda").doc(doc.id).delete()
      })
    })


  }


  // BOOKMARKS

  newBookmarks: number = 0

    // TODO: Fix this
    bookmarkJob(card) {
      this.uid = JSON.parse(localStorage.getItem('user')).uid;

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

      let ref = this.db.collection("bookmarks").doc(this.uid).collection("bookmarks").doc(card.jobId.stringValue)
      ref.set(data);
      this.newBookmarks += 1
    }


  removeBookmark(jobId) {
    this.uid = JSON.parse(localStorage.getItem('user')).uid;
        //Load bookmarks on init
    this.db.collection("bookmarks").doc(this.uid).collection("bookmarks").doc(jobId).delete()

  }

  bookmarkListener() {
    this.uid = JSON.parse(localStorage.getItem('user')).uid;

      //Load bookmarks on init and listen to changes
      return this.db.collection("bookmarks").doc(this.uid).collection("bookmarks")

  }


  // JOB INFOS
  showJobInfos: boolean = false;
  currentJobInfos: any;


  toggleJobInfos(jobId, score) {
    let data;

    console.log(jobId);
    let job = this.db.collection("jobs").doc(jobId).ref.get().then(function(doc){
      if (doc.exists) {
        data = doc.data()

        // this.showJobInfos = true;

      } else {
        console.error("No matching documents found")
        data = {}

      }
    }).then(() => {
      console.log(data)
      this.currentJobInfos = data
      this.currentJobInfos.score = score
      this.showJobInfos = true
    }
    )
  }

  closeJobInfos() {
    this.showJobInfos = false;
  }





//Onboarding

finalizeOnboarding() {
  this.uid = JSON.parse(localStorage.getItem('user')).uid;
  let ref = this.db.collection("users").doc(this.uid)
      ref.set({onboarded: true}, {merge: true});

}






















  //GENERAL FORMATTING

  formatLinks(links) {
    try {
      let link = links[0].stringValue
      return link
    } catch {
      return null

      }
  }
  formatNumber(tel) {
    if (!tel) {
      return '';
    }

    var value = tel.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
      return "Please enter a valid phone number";
    }

    var country, city, number;

    switch (value.length) {
      case 10: // +1PPP####### -> C (PPP) ###-####
        country = 1;
        city = value.slice(0, 3);
        number = value.slice(3);
        break;

      case 11: // +CPPP####### -> CCC (PP) ###-####
        country = value[0];
        city = value.slice(1, 4);
        number = value.slice(4);
        break;

      case 12: // +CCCPP####### -> CCC (PP) ###-####
        country = value.slice(0, 3);
        city = value.slice(3, 5);
        number = value.slice(5);
        break;

      default:
        return tel;
    }

    if (country == 1) {
      country = "";
    }

    number = number.slice(0, 3) + '-' + number.slice(3);

    return (country + " (" + city + ") " + number).trim();
  }



  formatDate(unixDate) {
    let formattedTime;
    try {
      let date = unixDate.toDate()
      let day = ("0" + date.getDate().toString()).slice(-2);
      // Minutes part from the timestamp
      let month = (date.getMonth() + 1);
      month = ("0" + month.toString()).slice(-2)
      // Seconds part from the timestamp
      let  year = date.getFullYear();

      // Will display time in 10:30:23 format
     formattedTime = year + '-' + month + '-' + day;
    }
    catch {
      formattedTime = unixDate
    }


    return formattedTime
  }

  formatSpokenLanguages(languages) {
    let final = ""
    try {
      languages.forEach(element => {
        final += element.stringValue
        final += ", "

      })

      final = final.slice(0, -2)
    }
    catch {
      final = null
    }


    return final
  }

  formatDescription(description) {
    console.log(description)
    //If description is from job bank
    if (typeof(description) != "string") {
      for (const property in description) {
        console.log(`${property}: ${description[property]}`);
      }
    }

    //This code doesn't work
    // else if (description == null) {
    //   let finalDescription = "Rlly Unavailable"
    //   return finalDescription
    // }
    else {
      return description
    }
  }


}
