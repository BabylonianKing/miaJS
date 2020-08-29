import { Component, OnInit } from '@angular/core';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';
import { CrudService } from 'src/shared/services/crud.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'matilda-dashboard',
  templateUrl: './matilda-dashboard.component.html',
  styleUrls: ['./matilda-dashboard.component.scss']
})
export class MatildaDashboardComponent implements OnInit {

  constructor(
    public sideNavService: MenuToggleService,
    public menu: MenuToggleService,
    public crudService: CrudService,
    public analytics: AngularFireAnalytics) { }

  ngOnInit(): void {
    this.crudService.pathRefresh();
    this.menu.activeItem = 1;
  }

}
