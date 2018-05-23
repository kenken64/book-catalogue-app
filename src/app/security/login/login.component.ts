import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder} from "@angular/forms";
import { AuthServiceFirebase } from "../../shared/security/auth.service";
import { Router} from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(private fb:FormBuilder,
                private authService: AuthServiceFirebase,
                private router:Router,
                private spinnerService: Ng4LoadingSpinnerService) {

      this.form = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required]
      });


  }

  ngOnInit() {
  }

  signInWithGoogle() {
    console.log("social google login...");
    console.log("social google login...");
    this.authService.googleLogin().then((result)=>{
      console.log(result);
      //this.router.navigate([' ']);
    }).catch((error)=> console.log(error));
    console.log("social google login...");
    
  }


  login() {
    this.spinnerService.show();
    const formValue = this.form.value;
    this.authService.login(formValue.email, formValue.password)
          .subscribe(
              (result) => {
                console.log(result);
                this.authService.setTokenIdToLocalstorage();
                
                setTimeout(function() {
                    this.spinnerService.hide();
                    this.router.navigate(['']);
                  }.bind(this), 4500);
                
              }
          )
  }

} 