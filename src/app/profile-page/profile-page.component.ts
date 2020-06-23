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

  userInfos: Array<any>;

  constructor(
    private afAuth: UserService,
    public CrudService: CrudService,
    public menu: MenuToggleService) { }

  
  // Timeout?
  ngOnInit(): void {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      this.CrudService.getUserInfos(user.uid) 
      .subscribe(result => {
        console.log(result)
        this.userInfos = result;
      })

      
    }, 1000)

  }

}
