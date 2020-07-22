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

  constructor(
    public crudService: CrudService,
    public menu: MenuToggleService) { }

  
  // Timeout?
  ngOnInit(): void {
    setTimeout(() => {
      this.crudService.getUserInfos() 
      .subscribe(result => {
        console.log(result)
        this.userInfos = result;
      })

      
    }, 1000)

  }

}
