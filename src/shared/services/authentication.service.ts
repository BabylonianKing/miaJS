import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/shared/models/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  userData: User; // Save logged in user data

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {
   /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        //Not needed here: JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        //Not needed here: JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/profile']);
        });
        // this.SetUserData(result.user);
      }).catch((error) => {
        return (error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationEmail();
        this.SetUserData(result.user);
      }).catch((error) => {
        return (error.message)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      console.log("USER SIGNED IN");
    }
    return (user !== null) ? true : false;
  }

  // Sign in with Google
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    // Navigate to dashboard
    this.router.navigate(['/profile']);
    return this.SetUserData(credential.user);
  }

  // Sign in with Facebook
  async facebookSignin() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    // Navigate to dashboard
    this.router.navigate(['/profile']);
    return this.SetUserData(credential.user);
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      // status: user.status,
      // language: user.language,
      // location: user.location,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

}

