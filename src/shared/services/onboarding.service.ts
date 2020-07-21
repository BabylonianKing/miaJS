import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor() { }
  
  onboardingStep: any = 0;
}
