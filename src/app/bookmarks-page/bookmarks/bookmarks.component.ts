import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/shared/services/crud.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  items: Array < any > = [];
  userId = JSON.parse(localStorage.getItem('user')).uid;
  jobTitle;
  jobId;
  currentTexterId;
  organization;
  location;
  companyImageURL: string;
  orgId;
  searchValue;
  imageURL;
  lowSalary;
  highSalary;
  jobDescription;
  responsabilities;
  jobType;
  requirements;
  applicationURL;
  filteredJobs: any = null;

  constructor(public CrudService: CrudService,
    public db: AngularFirestore,
    public afStorage: AngularFireStorage) {}

  ngOnInit(): void {

    //Load bookmarks on init
    let bookmarksRef = this.db.collection("bookmarks").doc(this.userId).collection("bookmarks").get().toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.items.push(doc.data())
        console.log(this.items)
      })

    })


  //Loading bookmark changes on the database
  let query = this.db.collection("bookmarks").doc(this.userId).collection("bookmarks")
  query.valueChanges().subscribe(data => {

    this.items = data

  })


  }

  searchByOrg() {
    const value = this.searchValue.toLowerCase();
    console.log(value);
    this.filteredJobs = this.items.filter(job => {
      return (
        job.jobTitle.toLowerCase().includes(value) ||
        job.organization.toLowerCase().includes(value)
      );
    });
  }
}
