import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'src/shared/services/firebase.service';
import {AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {

  tab: number = 0;

  constructor(public firebaseService: FirebaseService,
    public afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.showTab(this.tab);
  }

  showTab(n) {
    // This function will display the specified tab of the form ...
    let x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    x[n].style.display = "block";
  }
  

  sendOrgForm(form: NgForm) {
    this.firebaseService.registerOrg(form.value);
    let x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    x[this.tab].style.display = "none";
    this.tab ++;
    this.showTab(this.tab);
  }

  sendJobForm(form: NgForm) {
    this.firebaseService.postJob(form.value);
    let x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    x[this.tab].style.display = "none";
    this.tab ++;
    this.showTab(this.tab);
  }

  uploadImage(event) {
    let userId = JSON.parse(localStorage.getItem('user')).uid;
    this.afStorage.upload(`/coverImages/${userId}`, event.target.files[0]);

    let ref = this.afStorage.ref(userId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    ref.put(event.target.files[0]).percentageChanges().toPromise().then(data => window.location.reload());
    



  }


}
