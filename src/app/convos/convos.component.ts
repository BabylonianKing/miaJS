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

@Component({
  selector: 'convos',
  templateUrl: './convos.component.html',
  styleUrls: ['./convos.component.scss']
})
export class ConvosComponent implements OnInit {

  items: Array < any > ;
  searchValue: string = "";
  org_filtered_items: Array < any > ;

  @Input() isSelected: boolean = false;
  @Output() selectedUser = new EventEmitter();

  constructor(
    public firebaseService: FirebaseService,
    private afAuth: AuthenticationService,
    private cookie: CookieService,
    public db: AngularFirestore
  ) {}

  ngOnInit(): void {
    // Load conversations
    const userId = JSON.parse(localStorage.getItem('user')).uid;

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
          
          let orgId = doc.data().orgId
          let orgData;
          try {
            console.log(orgId)
            this.db.collection("organizations").doc(orgId).get().toPromise().then(document => {
              orgData = document.data()
              console.log(document.data())
            }).then(random => {
              databaseOfUsers.push({
                //id will be the job id
                id: doc.id,
                jobTitle: doc.data().jobTitle,
                organization: orgData.name,
                location: orgData.location
                // lastMessage: "Hello",
                // isRead: true
              })
            }
            )
          } catch (error) {
            console.log(`An error occurred, ${error}`)
          }

        })
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
    // this.firebaseService.getItems(userId)
    // .subscribe(result => {
    //   this.items = result;
    //   console.log(this.items)
    // })
  }

  // Don't use firebase service everytime (javascript filter)
  // Subscribe only to uid, then use js filter on items array

  searchByOrg() {
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchOrganization(value)
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
    this.selectedUser.emit(item.id);
    item.isSelected = !item.isSelected;

  }

}
