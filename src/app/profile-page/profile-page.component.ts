import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { FirebaseService } from 'src/shared/services/firebase.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  userInfos: Array<any>;

  constructor(private afAuth: AuthenticationService,
    public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    
    const user = JSON.parse(localStorage.getItem('user'));
    this.firebaseService.getUserInfos(user.uid)
    .subscribe(result => {
      setTimeout(()=>{console.log(result);
        this.userInfos = result;}, 1000)
      
    })
  }
}
