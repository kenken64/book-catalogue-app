import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import { AuthServiceFirebase } from "../../shared/security/auth.service";
import {Router} from "@angular/router";
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

  signInWithGoogle(): void {

  }


  login() {
    this.spinnerService.show();
    const formValue = this.form.value;
    this.authService.login(formValue.email, formValue.password)
          .subscribe(
              () => {
                this.authService.setTokenIdToLocalstorage();
                setTimeout(function() {
                    this.spinnerService.hide();
                  }.bind(this), 3000);
                this.router.navigate(['']);
              }
          );
  }

} 