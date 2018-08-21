import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../services/auth-api.service';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = "";
  public password = ""; 

  constructor(public auth:AuthApiService, public log:LoggerService) {

  }

  public async login() {
    if (!this.username) alert("Username missing");
    else if (!this.password) alert("Password missing");
    else {
      try {
        this.auth.onLoggedIn.subscribe(t=> {
          this.log.logInfo(`Login successfull`);
          this.reset();
        })

        await this.auth.login(this.username, this.password);
      }
      catch(err) {
        this.log.logError(err);
      }
    }
  }

  public reset() {
    this.username = "";
    this.password = "";
  }

  ngOnInit() {
    this.reset();
  }
}
