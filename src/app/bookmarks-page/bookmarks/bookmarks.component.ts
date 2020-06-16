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
  applicationURL;


  constructor(public firebaseService: FirebaseService,
    private afAuth: AuthenticationService,
    private cookie: CookieService,
    public db: AngularFirestore,
    public afStorage: AngularFireStorage) {}

  ngOnInit(): void {

    let databaseOfUsers = []
    let filteredJobs = []


    let usersRef = this.db.collection("jobs").get().toPromise()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("User databse is empty");
          return
        }

        snapshot.forEach(doc => {
          let orgId = doc.data().orgId

          if (orgId === undefined) {

            let jobId = doc.id
            let jobTitle = doc.data().jobTitle
            let organization = doc.data().orgName
            let location = doc.data().location
           let lowSalary = doc.data().salary
           let highSalary = doc.data().salary
            let jobDescription = doc.data().jobDescription
            let responsabilities = doc.data().responsabilities
            let jobType = doc.data().jobType
            let requirements = doc.data().requirements
            let applicationURL = doc.data().applicationURL
            let imageURL = "https://uploads-ssl.webflow.com/5ea1997894e4390e5fbe12b2/5ea3164c953e8a56201c055c_icons8-target-50.png"

            // console.log(doc.data().orgName)
            databaseOfUsers.push({
    
              jobId: jobId,
              jobTitle: jobTitle,
              organization: organization,
              location: location,
              lowSalary: lowSalary,
              highSalary: highSalary,
              jobDescription: jobDescription,
              responsabilities: responsabilities,
              jobType: jobType,
              requirements: requirements,
              applicationURL: applicationURL,
              imageURL: imageURL
    
            })






          } else {


            //Reset the image url to null  
            this.afStorage.ref(`/orgImages/${orgId}`).getDownloadURL().toPromise().then(data => {


              //If there isn't an image, use the webflow image

              if (!this.imageURL) {
                this.imageURL = "https://uploads-ssl.webflow.com/5ea1997894e4390e5fbe12b2/5ea3164c953e8a56201c055c_icons8-target-50.png"
              }


                let orgData;
                try {
                  this.db.collection("organizations").doc(orgId).get().toPromise().then(document => {
                    orgData = document.data()
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
                    this.applicationURL = doc.data().applicationURL



                    // this.db.collection("conversations").doc(this.userId).collection(doc.data().jobId).   get().toPromise()
                    // .then()
                    //Putting it here to ensure that image loads properly
                    this.imageURL = data;



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
                      applicationURL: this.applicationURL,
                      jobDescription: this.jobDescription

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



        })
        //Updating the items with the rry
        this.items = databaseOfUsers

      


      })


  }

  filteredJobs: any = null;

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
