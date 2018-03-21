import { Component, OnInit } from '@angular/core';
import { Book } from '../../shared/models/book';
import { BookServiceService } from '../../shared/services/book.service';
import { Observable } from 'rxjs/Observable';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  booksObservable: Observable<Book>;
  model = new Book('', '', '', '');
  
  constructor(private bookService: BookServiceService,
    private toastyService: ToastyService, 
    private toastyConfig: ToastyConfig) { }

  ngOnInit() {
  }


  onSaveBook(){
    console.log("Add new book !");
    //console.log(JSON.stringify(this.model));
    console.log(this.model);
    this.booksObservable = this.bookService.addBook(this.model)
      .map(result => result);
    this.booksObservable.subscribe(book => this.addToastMessage("Added book.", this.model.book_title)); 
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
