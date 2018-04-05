import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthServiceFirebase} from "../../shared/security/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  form:FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthServiceFirebase,
              private router: Router) {

      this.form = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required],
          confirm: ['',Validators.required]
      });


  }

  isPasswordMatch() {
      const val = this.form.value;
      return val && val.password && val.password == val.confirm;
  }

  signUp() {
      const val = this.form.value;

      this.authService.signUp(val.email, val.password)
          .subscribe(
              () => {
                  alert('User created successfully !');
                  this.router.navigate(['']);
              },
              err => alert(err)
          );
  }

  ngOnInit() {
 
  }

  goHome(){
    this.router.navigate(['']);
  }
}