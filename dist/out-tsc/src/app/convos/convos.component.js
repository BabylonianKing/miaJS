import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let ConvosComponent = class ConvosComponent {
    constructor(firebaseService, afAuth, cookie, db, afStorage) {
        this.firebaseService = firebaseService;
        this.afAuth = afAuth;
        this.cookie = cookie;
        this.db = db;
        this.afStorage = afStorage;
        this.searchValue = "";
        this.userId = JSON.parse(localStorage.getItem('user')).uid;
        this.isSelected = false;
        this.selectedUser = new EventEmitter();
    }
    ngOnInit() {
        // Load conversations
        //Temporary solution, ability to text all users in database
        //Fetching each document in collection, loading all users as cards, including the user itself.
        let databaseOfUsers = [];
        let usersRef = this.db.collection("conversation-cards").get().toPromise()
            .then(snapshot => {
            if (snapshot.empty) {
                console.log("User databse is empty");
                return;
            }
            snapshot.forEach(doc => {
                //Reset the image url to null  
                this.afStorage.ref(`/orgImages/${doc.data().orgId}`).getDownloadURL().toPromise().then(data => {
                    let orgId = doc.data().orgId;
                    //If there isn't an image, use the webflow image
                    if (!this.imageURL) {
                        this.imageURL = "https://uploads-ssl.webflow.com/5ea1997894e4390e5fbe12b2/5ea3164c953e8a56201c055c_icons8-target-50.png";
                    }
                    let orgData;
                    try {
                        this.db.collection("organizations").doc(orgId).get().toPromise().then(document => {
                            orgData = document.data();
                            console.log(document.data());
                        }).then(random => {
                            this.jobId = doc.id;
                            this.jobTitle = doc.data().jobTitle;
                            this.organization = orgData.name;
                            this.location = orgData.location;
                            // this.db.collection("conversations").doc(this.userId).collection(doc.data().jobId).   get().toPromise()
                            // .then()
                            //Putting it here to ensure that image loads properly
                            this.imageURL = data;
                            console.log("Image url:" + this.imageURL);
                            console.log("Job id" + this.jobId);
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
                            });
                        });
                    }
                    catch (error) {
                        console.log(`An error occurred, ${error}`);
                    }
                    this.imageURL = null;
                });
            });
            //Updating the items with the rry
            this.items = databaseOfUsers;
        });
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
        }, this.items);
        this.selectedUser.emit(item);
        item.isSelected = !item.isSelected;
    }
};
__decorate([
    Input()
], ConvosComponent.prototype, "isSelected", void 0);
__decorate([
    Output()
], ConvosComponent.prototype, "selectedUser", void 0);
ConvosComponent = __decorate([
    Component({
        selector: 'convos',
        templateUrl: './convos.component.html',
        styleUrls: ['./convos.component.scss']
    })
], ConvosComponent);
export { ConvosComponent };
//# sourceMappingURL=convos.component.js.map