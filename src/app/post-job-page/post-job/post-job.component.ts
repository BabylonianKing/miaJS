import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'src/shared/services/firebase.service';

@Component({
  selector: 'post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  sendForm(form: NgForm) {
    console.log(form)
    console.log("sumbitted")
    this.firebaseService.registerOrg(form.value);

    // form.reset();
  } 

}
