import { Component, OnInit, NgZone, Input } from '@angular/core';
import { FirebaseService } from 'src/shared/services/firebase.service';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() status: string;
  @Input() phone: string;
  @Input() location: string;
  @Input() language: string;

  valueHidden: boolean = false;
  inputHidden: boolean = true;

  constructor(
    public firebaseService: FirebaseService,
    public afAuth: AuthenticationService,
    public ngZone: NgZone,
    public router: Router) { }

  ngOnInit(): void {
  }

  UpdateUser(value) {
    console.log(value);
    const u = this.afAuth.userData;
    const uid = u.uid;
    this.firebaseService.updateUser(uid, value)
    .then(
    res => {
      this.router.navigate(['/profile']);
    }
  )
  }

  EditInput() {
    this.valueHidden = true;
    this.inputHidden = false;
  }

  ConfirmInput() {
    this.valueHidden = false;
    this.inputHidden = true;
  }
}
