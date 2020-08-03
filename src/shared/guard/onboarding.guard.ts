import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {
  constructor(
    public db: AngularFirestore,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      let userId = JSON.parse(localStorage.getItem('user')).uid;

      this.db.collection("users").doc(userId).get().toPromise().then(document => {
        try {
          if (document.data().onboarded) {
            this.router.navigate(['/profile'])
            return false
          } else {
            return true
          }

        } catch {
          return true
        }
      })
      return false;

  }

}
