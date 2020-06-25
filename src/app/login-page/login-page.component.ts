import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/shared/services/crud.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.pathRefresh();
  }

}
