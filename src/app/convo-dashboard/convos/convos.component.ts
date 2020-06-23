import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  CrudService
} from 'src/shared/services/crud.service';
import {
  UserService
} from 'src/shared/services/user.service';
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
  selector: 'convos',
  templateUrl: './convos.component.html',
  styleUrls: ['./convos.component.scss']
})
export class ConvosComponent implements OnInit {

  items: Array < any > ;
  searchValue: string = "";
  org_filtered_items: Array < any > ;
  userId = JSON.parse(localStorage.getItem('user')).uid;
  jobId;
  jobTitle;
  organization;
  location;
  lastMessage;
  imageURL: string;


  @Input() isSelected: boolean = false;
  @Output() selectedUser = new EventEmitter();

  constructor(
    public CrudService: CrudService,
    private afAuth: UserService,
    private cookie: CookieService,
    public db: AngularFirestore,
    public afStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    // Load conversations

    //Temporary solution, ability to text all users in database
    //Fetching each document in collection, loading all users as cards, including the user itself.
    let databaseOfUsers = []



    let usersRef = this.db.collection("conversation-cards").get().toPromise()
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
                    orgId: orgId

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

    //To continue implementing, reading from conversation-cards, each person is a document, storing objects of people they talked to, including time element, most recent text, 
    //const user2Id = JSON.parse(localStorage.getItem('currentTexter')).uid;

    // let cardRef = this.db.collection("conversations-cards").doc(userId)

    // let getDoc = cardRef.get()
    // .toPromise().then(doc => {
    //   if (!doc.exists) {
    //     console.log("This person has never texted anyone")
    //   } else {
    //     let conversations = doc.data()
    //     console.log(conversations);
    //     this.items = conversations.array;
    //   }
    // })


    //Should be removed later on
    // this.CrudService.getItems(userId)
    // .subscribe(result => {
    //   this.items = result;
    //   console.log(this.items)
    // })
  }

  // Don't use firebase service everytime (javascript filter)
  // Subscribe only to uid, then use js filter on items array

  searchByOrg() {
    let value = this.searchValue.toLowerCase();
    this.CrudService.searchOrganization(value)
      .subscribe(result => {
        this.org_filtered_items = result;
        this.items = this.org_filtered_items;
      });
  }

  changeChat(item) {

    //Ensuring that only one convo-card is highlighted at a time
    this.items.forEach(function (part, index) {
      this[index].isSelected = false;
    }, this.items)
    this.selectedUser.emit(item);
    item.isSelected = !item.isSelected;

  }

}
