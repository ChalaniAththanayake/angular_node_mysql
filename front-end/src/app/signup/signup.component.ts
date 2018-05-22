import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as alertify from 'alertify.js';
import { LoginmanagementService } from '../_services/loginmanagement.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username;
  email;
  password;
  confirmPassword;

  constructor(
    private router: Router,
    private loginmanagementService: LoginmanagementService
  ) { }

  ngOnInit() {
  }
  signup() {
    if (this.username == undefined) {
      alertify.logPosition("bottom right");
      alertify.delay(1000);
      alertify.error("Enter username");
    }
    else if (this.email == undefined) {
      alertify.logPosition("bottom right");
      alertify.delay(1000);
      alertify.error("Enter email");
    }
    else if (this.password == undefined) {
      alertify.logPosition("bottom right");
      alertify.delay(1000);
      alertify.error("Enter password");
    }
    else if (this.confirmPassword == undefined) {
      alertify.logPosition("bottom right");
      alertify.delay(1000);
      alertify.error("Enter confirmpassword");
    }
    else {
      if (this.password != this.confirmPassword) {
        alertify.logPosition("bottom right");
        alertify.delay(1000);
        alertify.error(" confirmpassword incorrect");
      }
      else {
        let accountData = {
          username: this.username,
          password: this.password,
          email: this.email
        }
        this.loginmanagementService.signUp(accountData).subscribe(res => {
          if (res.json() != null) {
            this.router.navigate(['/login']);
          }
        });
        
      }

    }
  }
  signin(){
    this.router.navigate(['/login']);
  }
}
