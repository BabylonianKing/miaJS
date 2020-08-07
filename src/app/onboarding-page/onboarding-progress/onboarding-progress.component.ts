import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/shared/services/onboarding.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'onboarding-progress',
  templateUrl: './onboarding-progress.component.html',
  styleUrls: ['./onboarding-progress.component.scss']
})
export class OnboardingProgressComponent implements OnInit {

  userId;
  userRefData;
  user;

  constructor(
    public onboarding: OnboardingService,
    public db: AngularFirestore) { }

  ngOnInit(): void {

    this.userId = JSON.parse(localStorage.getItem('user')).uid;
    console.log(this.userId)

      this.userRefData = this.db.doc(`users/${this.userId}`).get().toPromise().then(document => {
        this.user = document.data()
        console.log(this.user)

      })

      // this.userRefData.subscribe(data => {
      //   this.user = data
      // });

  }

}
