import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { userFire } from 'src/shared/models/user.model';

import { firestore, auth, User } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class UserService {

  userData: User; // Save logged in user data

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/chat']);
        });
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  // Sign up with email/password and User first name and last name
  SignUp() {
    return this.afAuth.createUserWithEmailAndPassword(this.createEmail, this.createPassword)
      .then((result) => {
        this.SendVerificationEmail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  // Sign in with Google
  async googleSignin() {
    const credential = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    this.SetUserData(credential.user)
    this.router.navigate(['/chat']);
  }

  createFirstName: string;
  createLastName: string;
  createEmail: string;
  createPassword: string;

  private SetUserData(user) {

    console.log("Hello")

    const data = {
      uid: user.uid,
      firstName: this.createFirstName,
      lastName: this.createLastName,
      displayName: this.createFirstName + ' ' + this.createLastName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }

    this.afs.doc(`users/${user.uid}`).set(data, {merge: true});
  }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user !== null) {
        console.log("USER SIGNED IN");
      }
      return (user !== null) ? true : false;
    }

      // Send email verification when new user sign up
  SendVerificationEmail() {
    return this.afAuth.currentUser
    .then(u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['/onboarding']);
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    })
  }
}
