import { Component, OnInit } from '@angular/core';
import { BookfirebaseService } from '../../shared/services/bookfirebase.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  results: any;

  constructor(
    private bookfirebase: BookfirebaseService,
    private toastyService: ToastyService, 
    private toastyConfig: ToastyConfig) { }

  ngOnInit() {
    this.bookfirebase.getAllBookDetails().subscribe((result)=>{
      this.results = result;
    });
  }

}
