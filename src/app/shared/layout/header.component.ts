import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  isLogon: boolean;
  subscription: Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn$.subscribe(result=>{
      console.log(result);
      this.isLogon = result;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe(); //prevent memory leak.
  }
}