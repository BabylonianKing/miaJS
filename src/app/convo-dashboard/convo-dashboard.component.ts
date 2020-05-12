import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-convo-dashboard',
  templateUrl: './convo-dashboard.component.html',
  styleUrls: ['./convo-dashboard.component.scss']
})
export class ConvoDashboardComponent implements OnInit {

  @Input() isUnread: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
