import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(private afs: AngularFirestore,
    ) { }

  uid = JSON.parse(localStorage.getItem('user')).uid;

  onboardingStep: number = 0;




  addTempUserMessage(messages, text) {
    messages.push({
      text,
      sender: 'Human',
      reply: true,
      date: new Date()
    });

    return messages
  }

  addTempBotMessage(messages, text) {
    messages.push({
      text,
      sender: 'Bot',
      date: new Date(),
      richCard: false
    });

    return messages
  }
  ensureNotNull(variable) {
    while (variable == null) {
      setTimeout(function () {}, 500);
    }

    return variable
  }


  checkOnboardingStep(res) {
    if (res.action === "Onboarding.Onboarding-yes") {
      return true
    } else if (res.action === "Onboarding-02-ContactInformations.Onboarding-02-ContactInformations-yes") {
      return true
    } else if (res.action === "Onboarding-03-Education&EmploymentHistory.Onboarding-03-Education&EmploymentHistory-yes") {
      return true
    } else if (res.action === "Onboarding-04-ValuesInterestsObjectives.Onboarding-04-ValuesInterestsObjectives-yes") {
      return true
    }
    else if (res.action === "Onboarding-05-NotificationPreferences.Onboarding-05-NotificationPreferences-yes" && res.allRequiredParamsPresent == true) {
      // return true
    }
    else {
      return false
    }
  }

  uploadData(res) {
    let params = res.outputContexts[0].parameters.fields

    if (this.onboardingStep == 0) {
      const data = {
        dateOfBirth: new Date(params['date-of-birth'].stringValue),
        gender: params["gender"].stringValue,
        //This list value might have to be modified
        spokenLanguages: params["spoken-languages"].listValue,
      }


      this.afs.doc(`users/${this.uid}`).set(data, {merge: true});

    }

    if (this.onboardingStep == 1) {
      const data = {
        phoneNumber:  params["phone-number"].stringValue,
        location: params["location"].stringValue,
        links: params["social-links"].listValue,
      }
      this.afs.doc(`users/${this.uid}`).set(data, {merge: true});
    }

    if (this.onboardingStep == 2) {
      const data = {
        educationHistory: params["education-history"].listValue,
        workHistory: params["work-history"].listValue,
      }

      this.afs.doc(`users/${this.uid}`).set(data, {merge: true});

    }
    if (this.onboardingStep == 3) {
      const data = {
        values: params["values"].listValue,
        interests: params["interests"].listValue
      }


      this.afs.doc(`users/${this.uid}`).set(data, {merge: true});

    }

    if (this.onboardingStep == 4) {
      const data = {
        emailFrequency: params["email-frequency"].stringValue
      }

      this.afs.doc(`users/${this.uid}`).set(data, {merge: true});

    }
  }




}
