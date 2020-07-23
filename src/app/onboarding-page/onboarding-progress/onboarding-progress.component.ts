import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/shared/services/onboarding.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'onboarding-progress',
  templateUrl: './onboarding-progress.component.html',
  styleUrls: ['./onboarding-progress.component.scss']
})
export class OnboardingProgressComponent implements OnInit {

  constructor(public onboarding: OnboardingService,
    public user: UserService ) { }

  ngOnInit(): void {
  }

}
