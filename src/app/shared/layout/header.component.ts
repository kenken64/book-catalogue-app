import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceFirebase } from "../../shared/security/auth.service";
import {AuthInfo} from "../../shared/security/auth-info";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSocial: any;

  authInfo: AuthInfo;
  constructor(private authService:AuthServiceFirebase) {
  }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);
  }

  ngOnDestroy(){
    
  }

  logout(){
    this.authService.logout();
  }
}