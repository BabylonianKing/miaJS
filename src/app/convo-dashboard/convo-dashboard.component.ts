import { Component, OnInit } from '@angular/core';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';

@Component({
  selector: 'convo-dashboard',
  templateUrl: './convo-dashboard.component.html',
  styleUrls: ['./convo-dashboard.component.scss']
})

export class ConvoDashboardComponent implements OnInit {

  constructor(public sideNavService: MenuToggleService) { }

  ngOnInit(): void {
  }

}
