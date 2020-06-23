import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/shared/services/crud.service';
import {AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {

  tab: number = 0;
  event;

  constructor(public CrudService: CrudService,
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
    this.CrudService.registerOrg(form.value).then(data => {    if (this.event) {
      let orgId = JSON.parse(localStorage.getItem('orgId'));
      this.afStorage.upload(`/orgImages/${orgId}`, this.event.target.files[0]);
  
      let ref = this.afStorage.ref(orgId);
      // the put method creates an AngularFireUploadTask
      // and kicks off the upload

      // ref.put(this.event.target.files[0]).percentageChanges().toPromise().then(data => window.location.reload());
      
    }})
    
    ;
    let x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    x[this.tab].style.display = "none";
    this.tab ++;
    this.showTab(this.tab);


    //If there is an image uploaded, upload that image to the Firestore storage

  }

  sendJobForm(form: NgForm) {
    this.CrudService.postJob(form.value);
    let x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    x[this.tab].style.display = "none";
    this.tab ++;
    this.showTab(this.tab);
  }

  uploadImage(event) {
    this.event = event;


  }


}
