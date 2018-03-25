import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AuthService {

  private isLoggedInSource = new Subject<boolean>();
  isLoggedIn$ = this.isLoggedInSource.asObservable();
  
  setLogon(logonFlag: boolean){
    this.isLoggedInSource.next(logonFlag);
  }

  logout(){
    
  }
  
}
