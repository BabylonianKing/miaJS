import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FirebaseService
} from 'src/shared/services/firebase.service';
import {
  AuthenticationService
} from 'src/shared/services/authentication.service';
import {
  CookieService
} from 'ngx-cookie-service';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import {
  AngularFireStorage
} from '@angular/fire/storage';
@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  items: Array < any > = [];
  userId = JSON.parse(localStorage.getItem('user')).uid;
  jobTitle;
  jobId;
  currentTexterId;
  organization;
  location;
  companyImageURL: string;
  orgId;
  searchValue;
  imageURL;
  lowSalary;
  highSalary;
  jobDescription;
  responsabilities;
  jobType;
  requirements;
  applicationURL;
  filteredJobs: any = null;

  constructor(public firebaseService: FirebaseService,
    private afAuth: AuthenticationService,
    private cookie: CookieService,
    public db: AngularFirestore,
    public afStorage: AngularFireStorage) {}

  ngOnInit(): void {

    //Load bookmarks on init
    let bookmarksRef = this.db.collection("bookmarks").doc(this.userId).collection("bookmarks").get().toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.items.push(doc.data())
        console.log(this.items)


      


      })

    })



  //Loading bookmark changes on the database
  let query = this.db.collection("bookmarks").doc(this.userId).collection("bookmarks")
  query.valueChanges().subscribe(data => {
    // this.messages = [];
    // this.messages.push(data.values);
    this.items = data
    // this.db.collection("conversation-cards").doc(this.userId).collection(this.currentTexterId).set(data[-1]

  })


  }

  searchByOrg() {
    const value = this.searchValue.toLowerCase();
    console.log(value);
    this.filteredJobs = this.items.filter(job => {
      return (
        job.jobTitle.toLowerCase().includes(value) ||
        job.organization.toLowerCase().includes(value)
      );
    });
  }
}
