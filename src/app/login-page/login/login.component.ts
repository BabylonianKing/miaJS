import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string;
  password: string;
  errorMessage: string;

  constructor(
    public UserService: UserService,
  ) { }

  public ngOnInit(): void {}

  signIn() {
    this.UserService.SignIn(this.email, this.password);
    this.email = ''; 
    this.password = '';
  }

}
