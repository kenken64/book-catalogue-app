import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { BookfirebaseService } from '../../shared/services/bookfirebase.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  form:FormGroup;
  tocs = new Array();

  constructor(private authService: AuthService,
    private fb:FormBuilder,
    private bookfirebase: BookfirebaseService,
    private toastyService: ToastyService, 
    private toastyConfig: ToastyConfig) { 
      this.form = this.fb.group({
        longDescription: ['',Validators.required],
        toc: [''],
        email: ['',Validators.required],
        title: ['',Validators.required],
        
    });
    }

  ngOnInit() {
    this.authService.setLogon(true);
  }

  isErrorVisible(field:string, error:string) {

    return this.form.controls[field].dirty
            && this.form.controls[field].errors &&
            this.form.controls[field].errors[error];

  }

  addToc(form){
    this.tocs.push(form.value.toc);
  }

  saveBookDetails(form){
    form.value.tocs = this.tocs;
    this.bookfirebase.createNewBookDetails(form.value);
    this.addToastMessage("Added book.", form.value.title)
  }

  addToastMessage(title, msg) {
    let toastOptions: ToastOptions = {
        title: title,
        msg: msg,
        showClose: true,
        timeout: 4500,
        theme: 'bootstrap',
        onAdd: (toast: ToastData) => {
            console.log('Book ' + toast.id + ' has been added!');
        }
    };
    this.toastyService.success(toastOptions);
  }

}
