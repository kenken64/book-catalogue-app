import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  public today = new Date();
  isLogon: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn$.subscribe(result=>{
      console.log(result);
      this.isLogon = result;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
