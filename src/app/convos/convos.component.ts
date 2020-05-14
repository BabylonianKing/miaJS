import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/shared/services/firebase.service';

@Component({
  selector: 'convos',
  templateUrl: './convos.component.html',
  styleUrls: ['./convos.component.scss']
})
export class ConvosComponent implements OnInit {

  items: Array<any>;

  constructor(
    public firebaseService: FirebaseService,
  ) { }

  ngOnInit(): void {
    // Undefined? console.log(this.items)
    this.firebaseService.getItems()
    .subscribe(result => {
      this.items = result;
    })
  }

}
