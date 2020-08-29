import { Component, OnInit } from '@angular/core';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';
import { CrudService } from 'src/shared/services/crud.service';

@Component({
  selector: 'bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.scss']
})
export class BookmarksPageComponent implements OnInit {

  constructor(
    public sideNavService: MenuToggleService,
    public menu: MenuToggleService,
    public crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.newBookmarks = 0;
    this.menu.activeItem = 2;
  }

}
