import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/shared/services/crud.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';


@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  cards: Array <any>;
  searchValue;
  filteredCards: any = null;

  constructor(
    public crudService: CrudService,
    public analytics: AngularFireAnalytics) {}

  ngOnInit(): void {

    this.crudService.delay(500).then(() => {
          //Load user's bookmarks and listen for updates
    this.crudService.bookmarkListener().valueChanges().subscribe(data => {
      this.cards = data

    })

    })



  }

  //Search functionality in the bookmark page
  searchByOrg() {
    const value = this.searchValue.toLowerCase();
    this.filteredCards = this.cards.filter(job => {
      console.log(job)
      return (
        job.title.stringValue.toLowerCase().includes(value) ||
        job.company.stringValue.toLowerCase().includes(value) ||
        job.location.stringValue.toLowerCase().includes(value) ||
        job.employmentType.stringValue.toLowerCase().includes(value)
      );
    });
  }
}
