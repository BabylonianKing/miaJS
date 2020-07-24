import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class UserProfileService {

  constructor(
    public afAuth: UserService,
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
    this.updateUser(uid, {phoneNumber: phone.phone})
    .then(() => this.editingPhone = false)
  }

  // CHANGE PASSWORD
  editingPassword: boolean = false;

  editPassword(password) {
    return this.afAuth.afAuth.currentUser
    .then((u) => u.updatePassword(password))
    .then(() => this.editingPassword = false)
  }

  // CHANGE GENDER
  editingGender: boolean = false;

  editGender(gender) {
    const uid = this.afAuth.userData.uid;
    this.updateUser(uid, gender)
    .then(() => this.editingGender = false)
  }

  // CHANGE DOB
  editingDOB: boolean = false;

  editDOB(dob) {
    const uid = this.afAuth.userData.uid;
    this.updateUser(uid, dob)
    .then(() => this.editingDOB = false)
  }  


}
