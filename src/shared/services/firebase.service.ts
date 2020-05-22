import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public db: AngularFirestore,
    public authenticationService: AuthenticationService) { }


  registerOrg(formValue) {
    console.log(formValue)
    return this.db.collection('organizations').add({
      name: formValue.org_name,
      nameToSearch: formValue.org_name.toLowerCase(),
      logo: formValue.org_logo,
      location: formValue.org_location,
      values: formValue.org_values,
      bio: formValue.org_bio
    });
  }
  

  getUserInfos(userKey) {
    return this.db.collection('user-infos', ref => ref.where("uid", '==', userKey)).valueChanges();
  }

  getUser(userKey){
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value){
    // value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('user-infos').doc(userKey).update(value);
  }

  deleteUser(userKey){
    return this.db.collection('items').doc(userKey).delete();
  }

  getItems(userKey){
    // SEE TUTORIAL FOR WHY .snapshotChanges(); return this.db.collection('items').snapshotChanges();
    return this.db.collection('items', ref => ref.where("uid", '==', userKey)).valueChanges();

    //return this.db.collection('conversation-cards', ref => ref.where("uid", '==', userKey)).valueChanges();

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
}