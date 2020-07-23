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
    } else {
      return false
    }
  }

  uploadData(res) {
    let params = res.outputContexts[0].parameters.fields

    if (this.onboardingStep == 0) {
      const data = {
        dateOfBirth: new Date(params['date-of-birth'].stringValue),
        gender: params.gender.stringValue,
        defaultLanguage: params["default-language"].stringValue,
        //This list value might have to be modified
        spokenLanguages: params["spoken-languages"].listValue,

      }


      this.afs.doc(`users/${this.uid}`).set(data, {merge: true});

    }
  }




}
