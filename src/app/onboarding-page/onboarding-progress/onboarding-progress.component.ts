import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/shared/services/onboarding.service';

@Component({
  selector: 'onboarding-progress',
  templateUrl: './onboarding-progress.component.html',
  styleUrls: ['./onboarding-progress.component.scss']
})
export class OnboardingProgressComponent implements OnInit {

  constructor(public onboarding: OnboardingService ) { }

  ngOnInit(): void {
  }

}
