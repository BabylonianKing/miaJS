import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/shared/services/authentication.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public afAuth: AuthenticationService) { }

  ngOnInit(): void {
  }

  signOut() {
    this.afAuth.SignOut();
  }
}
