import { Component, OnInit } from '@angular/core';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';
import { CrudService } from 'src/shared/services/crud.service';

@Component({
  selector: 'matilda-dashboard',
  templateUrl: './matilda-dashboard.component.html',
  styleUrls: ['./matilda-dashboard.component.scss']
})
export class MatildaDashboardComponent implements OnInit {

  constructor(
    public sideNavService: MenuToggleService,
    public menu: MenuToggleService,
    public crud: CrudService) { }

  ngOnInit(): void {
    this.crud.pathRefresh();
  }

}
