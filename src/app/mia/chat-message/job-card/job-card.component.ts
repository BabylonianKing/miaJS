import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {
@Input() description: string;
@Input() jobId: string;
@Input() url: string;
@Input() logo: string;
@Input() employmentType;
@Input() title: string;
@Input() company: string;
@Input() baseSalary;
@Input() location: string;
@Input() salaryType: string;
heartFilled: boolean = false;
userId = JSON.parse(localStorage.getItem('user')).uid;
@Output() descriptionEmitter = new EventEmitter<string>();



  constructor(public db: AngularFirestore,

    ) { }

  ngOnInit(): void {
    this.baseSalary = this.baseSalary.toFixed(2).toString() + "$"
    console.log(this.description)
  }

  bookmarkJob() {
    this.heartFilled = true;
    let data = {
      description: this.description,
      url: this.url,
      logo: this.logo,
      // jobImageURL: this.jobImageURL,
      title: this.title,
      company: this.company,
      employmentType: this.employmentType,
      salary: this.baseSalary,
      //hourly, weekly, monthly, annually
      salaryType: this.salaryType,


    }

    let ref = this.db.collection("bookmarks").doc(this.userId).collection("bookmarks")
    ref.add(data);
  }

  //TODO: Code this functionality
  learnMore() {
    this.descriptionEmitter.emit(this.description)
    console.log(this.description)
  }

  apply() {
    window.open(this.url, "_blank")

  }


}
