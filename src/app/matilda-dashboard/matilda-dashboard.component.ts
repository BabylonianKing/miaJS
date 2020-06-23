import { Component, OnInit } from '@angular/core';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';

@Component({
  selector: 'matilda-dashboard',
  templateUrl: './matilda-dashboard.component.html',
  styleUrls: ['./matilda-dashboard.component.scss']
})
export class MatildaDashboardComponent implements OnInit {

  constructor(public sideNavService: MenuToggleService) { }

  ngOnInit(): void {
  }

}
