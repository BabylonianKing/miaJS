import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/shared/services/user.service';
import { CrudService } from 'src/shared/services/crud.service';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  userInfos: any;
  loading: boolean = true;

  constructor(
    public crudService: CrudService,
    public menu: MenuToggleService) { }


  // Timeout?
  ngOnInit(): void {


      this.crudService.delay(600).then(() => {this.loading=false})

    // setTimeout(() => {


    // }, 1000)

  }

}
