import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/shared/models/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  userData: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 

    this.userData = afAuth.authState
    // Get the auth state, then fetch the Firestore user document or return null
    this.userData = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  getUser() {
    return this.userData.pipe(first()).toPromise();
  }

  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
       .then(userData => this.updateUserData(userData.user))
       .then(() => console.log("Welcome, your account has been created!"))
       .catch(error => console.log(error.message))
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!', res);
        this.router.navigate(['/chat']);
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async facebookSignin() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async SignOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
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