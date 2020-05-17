import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/shared/services/firebase.service';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  avatar: string;
  email: string;

  constructor(
    public firebaseService: FirebaseService,
    public afAuth: AuthenticationService,
    private cookie: CookieService) { }

  ngOnInit(): void {
    const user = this.afAuth.authState;
    console.log(user);
    if (user) {
      this.avatar = user.photoURL;
      this.email = user.email;
      console.log(this.avatar);
      console.log(this.email);
    }
  }


}
