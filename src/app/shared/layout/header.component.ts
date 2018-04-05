import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceFirebase } from "../../shared/security/auth.service";
import {AuthInfo} from "../../shared/security/auth-info";
import { AuthService } from "angularx-social-login";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSocial: any;

  authInfo: AuthInfo;
  constructor(private authService:AuthServiceFirebase,
    private authServiceSocial: AuthService) {
  }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);
    this.authServiceSocial.authState.subscribe((user) => {
      console.log("Google plus !");
      console.log(user);
      console.log(JSON.stringify(user));
      this.userSocial = user;
      //this.loggedIn = (user != null);
    });
  }

  ngOnDestroy(){
    
  }

  logout(){
    this.authService.logout();
  }
}