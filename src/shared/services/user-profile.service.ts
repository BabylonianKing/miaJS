import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class UserProfileService {
  
  constructor(
    public afAuth: AuthenticationService,
    public db: AngularFirestore
  ) { }

  // EDIT USER 
  updateUser(uid, data){
    return this.db.collection('users').doc(uid).update(data);
  }

  // CHANGE NAME
  editingName: boolean = false;

  editName(name) {
    const uid = this.afAuth.userData.uid;
    this.updateUser(uid, name)
    .then(() => this.editingName = false)
  }

  // CHANGE EMAIL
  editingEmail: boolean = false;

  editEmail(email) {
    return this.afAuth.afAuth.currentUser
    .then((u) => u.updateEmail(email))
    .then(() => this.editingEmail= false)
  }

  // CHANGE PHONE
  editingPhone: boolean = false;

  editPhone(phone) {
    const uid = this.afAuth.userData.uid;
    this.updateUser(uid, phone)
    .then(() => this.editingPhone = false)
  }

  // CHANGE PASSWORD
  editingPassword: boolean = false;

  editPassword(password) {
    return this.afAuth.afAuth.currentUser
    .then((u) => u.updatePassword(password))
    .then(() => this.editingPassword = false)
  }

  

}
