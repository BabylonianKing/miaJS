import { Component, OnInit } from '@angular/core';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';

@Component({
  selector: 'bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.scss']
})
export class BookmarksPageComponent implements OnInit {

  constructor(
    public sideNavService: MenuToggleService,
    public menu: MenuToggleService) { }

  ngOnInit(): void {

  }

}
