import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  errorMessage: string;

  constructor(
    public authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {}

  signUp() {
    this.authenticationService.SignUp(this.email, this.password).then(error => {
      console.log(error);
      this.errorMessage = error;    
    });
    
    this.email = ''; 
    this.password = '';
  }

}
