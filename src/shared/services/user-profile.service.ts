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
    return this.db.collection('users').doc(uid).set(data, {merge: true});
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
    console.log(email)
    this.afAuth.afAuth.currentUser
    .then((u) => u.updateEmail(email))
    .then(() => this.editingEmail = false)
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
    this.updateUser(uid, {gender: gender})
    .then(() => this.editingGender = false)
  }

  // CHANGE DOB
  editingDOB: boolean = false;

  editDOB(dob) {
    const uid = this.afAuth.userData.uid;
    this.updateUser(uid, {dateOfBirth: dob})
    .then(() => this.editingDOB = false)
  }



  // CHANGE INTERESTS
  editingInterests: boolean = false;

  editInterests(interests) {
    const uid = this.afAuth.userData.uid;
    this.updateUser(uid, {interests: interests})
    .then(() => this.editingInterests = false)
  }


    // CHANGE Values
    editingValues: boolean = false;

    editValues(values) {
      const uid = this.afAuth.userData.uid;
      this.updateUser(uid, {values: values})
      .then(() => this.editingValues = false)
    }


    // CHANGE Langauges NEEDS TO GET FIXED
    editingLanguages: boolean = false;

    editLanguages(languages) {
      const uid = this.afAuth.userData.uid;
      this.updateUser(uid, {spokenLanguages: languages})
      .then(() => this.editingLanguages = false)
    }

    // CHANGE Langauges NEEDS TO GET FIXED
    editingSocialLinks: boolean = false;

    editSocialLinks(socialLinks) {
      const uid = this.afAuth.userData.uid;
      this.updateUser(uid, {socialLinks: socialLinks})
      .then(() => this.editingSocialLinks = false)
    }

    // CHANGE INTERESTS
    editingSkills: boolean = false;

    editSkills(skills) {
      const uid = this.afAuth.userData.uid;
      this.updateUser(uid, {skills: skills})
      .then(() => this.editingSkills = false)
    }

    // CHANGE Experience
    editingExperience: boolean = false;

    editExperience(experience) {
      const uid = this.afAuth.userData.uid;
      this.updateUser(uid, {experience: experience})
      .then(() => this.editingExperience = false)
    }


    // CHANGE Education
    editingEducation: boolean = false;

    editEducation(education) {
      const uid = this.afAuth.userData.uid;
      this.updateUser(uid, {education: education})
      .then(() => this.editingEducation = false)
    }

    // CHANGE Honors
    editingHonors: boolean = false;

    editHonors(honors) {
      const uid = this.afAuth.userData.uid;
      this.updateUser(uid, {honors: honors})
      .then(() => this.editingHonors = false)
    }

    // CHANGE Email Preferences
    editingEmailFrequency: boolean = false;

    editemailFrequency(emailFrequency) {
      const uid = this.afAuth.userData.uid;
      this.updateUser(uid, {emailFrequency: emailFrequency})
      .then(() => this.editingEmailFrequency = false)
    }

















}
