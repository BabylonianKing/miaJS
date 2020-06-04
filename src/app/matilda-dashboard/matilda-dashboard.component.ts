import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {Router} from "@angular/router"
import { MiaComponent } from '../mia/mia.component';
import {ConvoInfoComponent} from '../convo-info/convo-info.component'
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';

@Component({
  selector: 'matilda-dashboard',
  templateUrl: './matilda-dashboard.component.html',
  styleUrls: ['./matilda-dashboard.component.scss']
})
export class MatildaDashboardComponent implements OnInit {


  router : Router;
  @Input() isUnread: boolean = false;
  @ViewChild(MiaComponent) child: MiaComponent;
  @ViewChild(ConvoInfoComponent) child2: ConvoInfoComponent;


  constructor(public sideNavService: MenuToggleService) { }

  ngOnInit(): void {
  }

  updateCurrentTexter(event) {
    localStorage.setItem('currentTexter', JSON.stringify(event));
  //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['/chat']);
  // }); 

  this.child.changeConversation();
  this.child2.changeConversation();

  }


}
