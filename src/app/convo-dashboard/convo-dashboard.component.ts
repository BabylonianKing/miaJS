import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {Router} from "@angular/router"
import { MiaComponent } from '../mia/mia.component';

@Component({
  selector: 'convo-dashboard',
  templateUrl: './convo-dashboard.component.html',
  styleUrls: ['./convo-dashboard.component.scss']
})

export class ConvoDashboardComponent implements OnInit {
  
  router : Router;
  @Input() isUnread: boolean = false;
  @ViewChild(MiaComponent) child: MiaComponent;

  constructor() { }

  ngOnInit(): void {
  }

  updateCurrentTexter(event) {
    localStorage.setItem('currentTexter', JSON.stringify(event));
  //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['/chat']);
  // }); 

  this.child.changeConversation();
  }

}
