import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/shared/services/onboarding.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'onboarding-progress',
  templateUrl: './onboarding-progress.component.html',
  styleUrls: ['./onboarding-progress.component.scss']
})
export class OnboardingProgressComponent implements OnInit {

  userId: string = JSON.parse(localStorage.getItem('user')).uid;
  userRefData;
  user;

  constructor(
    public onboarding: OnboardingService,
    public db: AngularFirestore) { }

  ngOnInit(): void {

    this.userId = JSON.parse(localStorage.getItem('user')).uid;

      this.userRefData = this.db.doc(`users/${this.userId}`).valueChanges()

      this.userRefData.subscribe(data => {
        this.user = data
      });

  }

}
