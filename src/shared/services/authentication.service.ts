import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/shared/models/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  userData: Observable<User>;
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private cookie: CookieService
  ) { 
    this.afAuth.authState.subscribe( authState => {
      this.authState = authState;
    })
  }

  // Check if user is authenticated
  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  // Check if user email is verified
  get isEmailVerified(): boolean {
  return this.isAuthenticated ? this.authState.emailVerified : false;
  }

  // Get current user' uID
  get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }

  get user(): any {
    if ( ! this.isAuthenticated ) {
      console.log("User info not returned.");
      return [];
    }
    console.log("User info returned.");
    console.log(this.authState.uid);
    return [
      {
        uid: this.authState.uid,
        displayName: this.authState.displayName,
        email: this.authState.email,
        phoneNumber: this.authState.phoneNumber,
        photoURL: this.authState.photoURL,
      }
    ];
  }

  // Sign up with email
  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
       .then(userData => this.updateUserData(userData.user))
       .then(() => {
        // Setting cookie
        this.cookie.set("userID", this.authState.uid)

        // Navigate to dashboard
        this.router.navigate(['/chat']);

      })
       .catch(error => console.log(error.message))
  }

  // Sign in with email
  SignIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!', res);

        // Setting cookie
        this.cookie.set("userID", this.authState.uid);

        // Navigate to dashboard on login
        this.router.navigate(['/chat']);
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  // Sign in with Google
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  // Sign in with Facebook
  async facebookSignin() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  // Sign out
  async SignOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/chat']);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = { 
      uid: user.uid, 
      email: user.email, 
      photoURL: user.photoURL
    } 

    return userRef.set(data, { merge: true })

  }

}