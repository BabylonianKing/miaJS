  import {
    Component,
    OnInit,
    NgZone,
    Input
  } from '@angular/core';
  import {
    CrudService
  } from 'src/shared/services/crud.service';
  import {
    UserService
  } from 'src/shared/services/user.service';
  import {
    Router
  } from '@angular/router';
  import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { NONE_TYPE } from '@angular/compiler';
import { AngularFirestore } from '@angular/fire/firestore';

  @Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
  })
  export class ProfileComponent implements OnInit {

    valueHidden: boolean = false;
    inputHidden: boolean = true;
    coverDownloadURL: string;
    profileDownloadURL: string;
    uploadProgress;
    showResumeUploaded = false;
    user = this.afAuth.userData;
    userId: string = JSON.parse(localStorage.getItem('user')).uid;
    resumeEvent;
    userRefData;

    constructor(
      public crudService: CrudService,
      public profileService: UserProfileService,
      public afAuth: UserService,
      public ngZone: NgZone,
      public router: Router,
      public afStorage: AngularFireStorage,
      public db: AngularFirestore) {}

    ngOnInit(): void {

      this.userId = JSON.parse(localStorage.getItem('user')).uid;

      this.userRefData = this.db.doc(`users/${this.userId}`).valueChanges()

      this.userRefData.subscribe(data => {
        this.user = data
      });


      this.afStorage.ref(`/coverImages/${this.userId}`).getDownloadURL().toPromise().then(data => this.coverDownloadURL = data)

      this.afStorage.ref(`/profileImages/${this.userId}`).getDownloadURL().toPromise().then(data => {
        this.profileDownloadURL = data;
        if (!this.profileDownloadURL) {
          this.profileDownloadURL = this.afAuth.userData.photoURL
        }

      })

      this.afStorage.ref(`/resume/${this.userId}`).getDownloadURL().toPromise().then(data => {
        if (data) {
          this.showResumeUploaded = true
        }

      })


    }


    uploadBanner(event) {
      let userId = JSON.parse(localStorage.getItem('user')).uid;
      this.afStorage.upload(`/coverImages/${userId}`, event.target.files[0]);

      let ref = this.afStorage.ref(userId);
      // the put method creates an AngularFireUploadTask
      // and kicks off the upload
      ref.put(event.target.files[0]).percentageChanges().toPromise().then(data => window.location.reload());
    }



    uploadResume(event) {
      let userId = JSON.parse(localStorage.getItem('user')).uid;

      this.afStorage.upload(`/resume/${userId}`, event.target.files[0]);

      let reference = this.afStorage.ref(userId);
      // the put method creates an AngularFireUploadTask
      // and kicks off the upload
      reference.put(event.target.files[0]).percentageChanges().toPromise().then(data => window.location.reload());
    }

    uploadProfile(event) {

      let userId = JSON.parse(localStorage.getItem('user')).uid;
      this.afStorage.upload(`/profileImages/${userId}`, event.target.files[0]);

      let ref = this.afStorage.ref(userId);
      // the put method creates an AngularFireUploadTask
      // and kicks off the upload
      ref.put(event.target.files[0]).percentageChanges().toPromise().then(data => window.location.reload());
    }

    formatNumber(tel) {
      if (!tel) {
        return '';
      }

      var value = tel.toString().trim().replace(/^\+/, '');

      if (value.match(/[^0-9]/)) {
        return "Please enter a valid phone number";
      }

      var country, city, number;

      switch (value.length) {
        case 10: // +1PPP####### -> C (PPP) ###-####
          country = 1;
          city = value.slice(0, 3);
          number = value.slice(3);
          break;

        case 11: // +CPPP####### -> CCC (PP) ###-####
          country = value[0];
          city = value.slice(1, 4);
          number = value.slice(4);
          break;

        case 12: // +CCCPP####### -> CCC (PP) ###-####
          country = value.slice(0, 3);
          city = value.slice(3, 5);
          number = value.slice(5);
          break;

        default:
          return tel;
      }

      if (country == 1) {
        country = "";
      }

      number = number.slice(0, 3) + '-' + number.slice(3);

      return (country + " (" + city + ") " + number).trim();
    }
  }
