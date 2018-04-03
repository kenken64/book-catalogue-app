import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from "../../shared/security/auth.service";
import {AuthInfo} from "../../shared/security/auth-info";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  authInfo: AuthInfo;
  constructor(private authService:AuthService) {
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