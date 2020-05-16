import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/shared/services/firebase.service';
import { AuthenticationService } from 'src/shared/services/authentication.service';
 
@Component({
  selector: 'convos',
  templateUrl: './convos.component.html',
  styleUrls: ['./convos.component.scss']
})
export class ConvosComponent implements OnInit {

  items: Array<any>;
  searchValue: string="";
  org_filtered_items: Array<any>;
  userKey: string="";

  constructor(
    public firebaseService: FirebaseService,
    public authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    // Undefined? console.log(this.items)
    this.firebaseService.getItems()
    .subscribe(result => {
      this.items = result;
    })
    console.log(this.userKey);
  }
  
  searchByOrg() {
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchOrganization(value)
    .subscribe(result => {
      this.org_filtered_items = result;
      this.items = this.org_filtered_items;
    });
    }
}
