import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/shared/services/crud.service';

@Component({
  selector: 'onboarding-page',
  templateUrl: './onboarding-page.component.html',
  styleUrls: ['./onboarding-page.component.scss']
})
export class OnboardingPageComponent implements OnInit {

  constructor(
    private router: Router,
    public crudService: CrudService

  ) { }

  showPage: boolean = true

  ngOnInit(): void {
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";
      console.log("cond");
      e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
      return confirmationMessage;              // Gecko, WebKit, Chrome <34
  });
  }


  loadAnimation(event: boolean) {
    if (event) {
      this.showPage = false
      this.crudService.finalizeOnboarding()
      this.crudService.delay(4000).then(() => {
        this.router.navigateByUrl("profile")
      }
      )
    }

  }

}
