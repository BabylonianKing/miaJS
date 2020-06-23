import { Component, OnInit } from '@angular/core';
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

    bookmarksCount;
    userId = JSON.parse(localStorage.getItem('user')).uid;

  ngOnInit(): void {

      //Loading bookmark changes on the database
  let query = this.db.collection("bookmarks").doc(this.userId).collection("bookmarks")
  query.valueChanges().subscribe(data => {

    this.bookmarksCount = data.length

  })
  }

  signOut() {
    this.afAuth.SignOut();
  }
}
