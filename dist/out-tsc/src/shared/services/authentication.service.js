import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
let AuthenticationService = class AuthenticationService {
    constructor(afAuth, afs, router, ngZone) {
        this.afAuth = afAuth;
        this.afs = afs;
        this.router = router;
        this.ngZone = ngZone;
        /* Saving user data in localstorage when
         logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                //Not needed here: JSON.parse(localStorage.getItem('user'));
            }
            else {
                localStorage.setItem('user', null);
                //Not needed here: JSON.parse(localStorage.getItem('user'));
            }
        });
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
            return (error.message);
        });
    }
    // Send email verfificaiton when new user sign up
    SendVerificationEmail() {
        return this.afAuth.currentUser
            .then(u => u.sendEmailVerification())
            .then(() => {
            this.router.navigate(['login']);
        });
    }
    // Sign up with email/password
    SignUp(email, password) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
            /* Call the SendVerificaitonMail() function when new user sign
            up and returns promise */
            this.SendVerificationEmail();
            this.SetUserData(result.user);
        }).catch((error) => {
            return (error.message);
        });
    }
    // Returns true when user is looged in and email is verified
    get isLoggedIn() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user !== null) {
            console.log("USER SIGNED IN");
        }
        return (user !== null) ? true : false;
    }
    // Sign in with Google
    googleSignin() {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = new auth.GoogleAuthProvider();
            const credential = yield this.afAuth.signInWithPopup(provider);
            // Navigate to dashboard
            this.router.navigate(['/profile']);
            return this.SetUserData(credential.user);
        });
    }
    // Sign in with Facebook
    facebookSignin() {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = new auth.FacebookAuthProvider();
            const credential = yield this.afAuth.signInWithPopup(provider);
            // Navigate to dashboard
            this.router.navigate(['/profile']);
            return this.SetUserData(credential.user);
        });
    }
    // Sign out 
    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
        });
    }
    /* Setting up user data when sign in with username/password,
    sign up with username/password and sign in with social auth
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user) {
        const userRef = this.afs.doc(`users/${user.uid}`);
        const userData = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            // status: user.status,
            // language: user.language,
            // location: user.location,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        };
        return userRef.set(userData, {
            merge: true
        });
    }
};
AuthenticationService = __decorate([
    Injectable({ providedIn: 'root' })
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map