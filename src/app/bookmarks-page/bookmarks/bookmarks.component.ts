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
  items: Array < any > ;
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
  applicationLink;


  constructor(public firebaseService: FirebaseService,
    private afAuth: AuthenticationService,
    private cookie: CookieService,
    public db: AngularFirestore,
    public afStorage: AngularFireStorage) {}

  ngOnInit(): void {

    let databaseOfUsers = []


    let usersRef = this.db.collection("jobs").get().toPromise()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("User databse is empty");
          return
        }

        snapshot.forEach(doc => {
            //Reset the image url to null  
            this.afStorage.ref(`/orgImages/${doc.data().orgId}`).getDownloadURL().toPromise().then(data => {
              let orgId = doc.data().orgId

              //If there isn't an image, use the webflow image

              if (!this.imageURL) {
                this.imageURL = "https://uploads-ssl.webflow.com/5ea1997894e4390e5fbe12b2/5ea3164c953e8a56201c055c_icons8-target-50.png"
              }

              let orgData;
              try {
                this.db.collection("organizations").doc(orgId).get().toPromise().then(document => {
                  orgData = document.data()
                  console.log(document.data())
                }).then(random => {
                  this.jobId = doc.id
                  this.jobTitle = doc.data().jobTitle
                  this.organization = orgData.name
                  this.location = orgData.location
                  this.lowSalary = doc.data().salary.low
                  this.highSalary = doc.data().salary.high
                  this.jobDescription = doc.data().jobDescription
                  this.responsabilities = doc.data().responsabilities
                  this.jobType = doc.data().jobType
                  this.requirements = doc.data().requirements
                  this.applicationLink = doc.data().applicationLink



                  // this.db.collection("conversations").doc(this.userId).collection(doc.data().jobId).   get().toPromise()
                  // .then()
                  //Putting it here to ensure that image loads properly
                  this.imageURL = data;
                  console.log("Image url:" + this.imageURL)
                  console.log("Job id" + this.jobId)
                  databaseOfUsers.push({
                    //id will be the job id
                    jobId: this.jobId,
                    jobTitle: this.jobTitle,
                    organization: this.organization,
                    location: this.location,
                    imageURL: this.imageURL,
                    orgId: orgId,
                    lowSalary: this.lowSalary,
                    highSalary: this.highSalary,

                    responsabilities: this.responsabilities,
                    jobType: this.jobType,
                    requirements: this.requirements,
                    applicationLink: this.applicationLink

                    // lastMessage: this.lastMessage,
                    // isRead: true
                  })


                })
              } catch (error) {
                console.log(`An error occurred, ${error}`)
              }

              this.imageURL = null

            })



          }



        )
        //Updating the items with the rry
        this.items = databaseOfUsers


      })


  }

  searchByOrg() {
    console.log("SearchByOrg()")
  }

}
