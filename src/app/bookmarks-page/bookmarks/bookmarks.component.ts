import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  jobTitle;
  currentTexterId;
  organization;
  location;
  companyImageURL: string;
  orgId;

  constructor() { }

  ngOnInit(): void {
  }

}
