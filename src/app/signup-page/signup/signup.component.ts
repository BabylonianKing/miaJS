import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  errorMessage: string;

  constructor(
    public user: UserService,
  ) { }

  ngOnInit(): void {}

  // signUp() {
  //   this.UserService.SignUp(this.email, this.password).then(error => {
  //     console.log(error);
  //     // this.errorMessage = error;    
  //   });
    
  //   this.email = ''; 
  //   this.password = '';
  // }

}
