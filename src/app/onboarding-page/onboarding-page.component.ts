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
  }


  loadAnimation(event: boolean) {
    if (event) {
      this.showPage = false
      this.crudService.delay(3000).then(() => {
        this.router.navigateByUrl("profile")
      }
      )
    }

  }

}
