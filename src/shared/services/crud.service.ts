import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { AngularFireStorage} from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    public db: AngularFirestore,
    public UserService: UserService,
    public afStorage: AngularFireStorage,
    private afAuth: AngularFireAuth) { }

    uid: string;
    displayName: string;
    email: string;

    userRef: AngularFirestoreDocument<any>;
    userRefData: Observable<any>;

    pathRefresh() {
      this.afAuth.authState.subscribe((user) => { // Need authState to load before all of this
        if (user) {
          this.uid = user.uid
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
        jobTitle: formValue.job_title,
        titleToSearch: formValue.job_title.toLowerCase(),
        jobType: formValue.job_type,
        location: formValue.job_location,
        salary: {low: formValue.job_salary_low, high: formValue.job_salary_high},
        requirements: formValue.job_requirements,
        responsibilities: formValue.job_responsibilities,
        jobDescription: formValue.job_description,
        orgId: JSON.parse(localStorage.getItem('orgId'))
      });
    }


  registerOrg(formValue) {
    console.log(formValue)
    return this.db.collection('organizations').add({
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
  
  



  getUserInfos(userKey) {
    return this.db.collection('user-infos', ref => ref.where("uid", '==', userKey)).valueChanges();
  }

  getUser(userKey){
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateEmail(email) {
    this.afAuth.currentUser
    .then(u => u.updateEmail(email));
  }

  deleteUser(userKey){
    return this.db.collection('items').doc(userKey).delete();
  }

  getItems(userKey){
    // SEE TUTORIAL FOR WHY .snapshotChanges(); return this.db.collection('items').snapshotChanges();
    return this.db.collection('items', ref => ref.where("uid", '==', userKey)).valueChanges();

    //return this.db.collection('conversation-cards', ref => ref.where("uid", '==', userKey)).valueChanges();

  }

  upload(event) {
    let userId = JSON.parse(localStorage.getItem('user')).uid;
    this.afStorage.upload(`/coverImages/${userId}`, event.target.files[0]);

    let ref = this.afStorage.ref(userId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    let uploadProgress = ref.put(event.target.files[0]).percentageChanges();
    console.log('image uploaded')
    
  }

  searchOrganization(searchValue){
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

  // CARDS & BOOKMARKS
}