import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as alertify from 'alertify.js';
import { LoginmanagementService } from '../_services/loginmanagement.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;

  constructor(
    private router: Router,
    private loginmanagementService: LoginmanagementService
  ) { }

  ngOnInit() {
  }
  login() {
    if (this.email == undefined) {
      alertify.logPosition("bottom right");
      alertify.delay(1000);
      alertify.error("Enter email");
    } 
    else if (this.password == undefined) {
      alertify.logPosition("bottom right");
      alertify.delay(1000);
      alertify.error("Enter password");
    }
    else {

      let accountData = {
        username: this.email,
        password: this.password
      }
      this.loginmanagementService.login(accountData).subscribe(res=>{
        console.log('res',res.json());
        if(res.json()){
          alertify.logPosition("bottom right");
          alertify.delay(1000);
          alertify.success("login success");
          this.router.navigate(['/home']);
        }
        else{
          alertify.logPosition("bottom right");
          alertify.delay(1000);
          alertify.error("Incorrect Email Or Password");
        }
      });

    }
  }

}

