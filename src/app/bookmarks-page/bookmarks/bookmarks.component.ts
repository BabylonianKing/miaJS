import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/shared/services/crud.service';


@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  cards: Array <any>;
  searchValue;
  filteredCards: any = null;

  constructor(public crudService: CrudService) {}

  ngOnInit(): void {

    //Load user's bookmarks and listen for updates
    this.crudService.bookmarkListener().valueChanges().subscribe(data => {
      this.cards = data

    })

  }

  //Search functionality in the bookmark page
  searchByOrg() {
    const value = this.searchValue.toLowerCase();
    console.log(value);
    this.filteredCards = this.cards.filter(job => {
      return (
        job.title.toLowerCase().includes(value) ||
        job.company.toLowerCase().includes(value)
      );
    });
  }
}
