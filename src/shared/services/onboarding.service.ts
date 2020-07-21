import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor() { }

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




}
