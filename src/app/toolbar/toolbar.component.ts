import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/shared/services/user.service';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    public afAuth: UserService,
    public sideNavService: MenuToggleService,
    public db: AngularFirestore,
    public menu: MenuToggleService) { }

    bookmarksCount: number;
    oldBookmarksCount: number;
    @Input() unseenBookmarksCount: number;
    userId;

  ngOnInit(): void {

  //Loading bookmark changes on the database
  this.userId = JSON.parse(localStorage.getItem('user')).uid;
  let query = this.db.collection("bookmarks").doc(this.userId).collection("bookmarks")
  query.valueChanges().subscribe(data => {

    this.bookmarksCount = data.length

  })


  let secondQuery = this.db.collection("user-infos").doc(this.userId).valueChanges().subscribe(result => {
    console.log(result)
  })



  }

  signOut() {
    this.afAuth.SignOut();
  }
}
