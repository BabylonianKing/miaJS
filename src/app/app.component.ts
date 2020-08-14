import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudService } from 'src/shared/services/crud.service';

export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
//   subscription: Subscription;

//   // Example in the constructor of you App Component
// constructor(private router: Router,
//   private crudService: CrudService) {
//   this.subscription = router.events.subscribe((event) => {
//     if (event instanceof NavigationStart) {
//       browserRefresh = !router.navigated;
//       console.log(browserRefresh)

//       if (browserRefresh) {

//       }


//     }
//   });
// }
}
