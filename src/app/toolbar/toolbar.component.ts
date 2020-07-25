import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/shared/services/user.service';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from 'src/shared/services/crud.service';

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
    public menu: MenuToggleService,
    public crudService: CrudService) { }


    userId;

  ngOnInit(): void {

  //Loading bookmark changes on the database
  this.userId = JSON.parse(localStorage.getItem('user')).uid;




  }

  signOut() {
    this.afAuth.SignOut();
  }
}
