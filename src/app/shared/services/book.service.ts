import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable} from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import { BookCriteria } from '../../shared/models/book-criteria';
import { BookResult } from '../../shared/models/book-result';
import { Book } from '../../shared/models/book';

const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class BookServiceService {
  private bookRootApiUrl  = `${environment.ApiUrl}/api/books`;
  private serachBookApiURL = this.bookRootApiUrl + "/search";
  
  constructor(private httpClient: HttpClient, 
    private toastyService: ToastyService, 
    private toastyConfig: ToastyConfig) {

  }

  public addBook (book: Book): Observable<Book> {
    console.log(book);
    console.log(this.bookRootApiUrl);
    return this.httpClient.post<Book>(this.bookRootApiUrl, book, httpOptions)
      .pipe(
        catchError(this.handleError('addBook', book))
      );
  }

  public updateBook (book: Book): Observable<Book> {
    console.log(book);
    console.log(this.bookRootApiUrl);
    return this.httpClient.put<Book>(this.bookRootApiUrl, book, httpOptions)
      .pipe(
        catchError(this.handleError('updateBook', book))
      );
  }

  public searchBooks(model) : Observable<BookResult[]> {
    var getURL = `${this.serachBookApiURL}?keyword=${model.keyword}&searchType=${model.searchType}&sortBy=${model.sortBy}&currentPerPage=${model.currentPerPage}&itemsPerPage=${model.itemsPerPage}`;
    return this.httpClient.get<BookResult[]>(getURL, httpOptions)
      .pipe(catchError(this.handleError<BookResult[]>('searchBooks')));

  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.addToastMessage("Error", JSON.stringify(error.error));
      return Observable.throw(error  || 'backend server error');
    };
  }

  addToastMessage(title, msg) {
    let toastOptions: ToastOptions = {
        title: title,
        msg: msg,
        showClose: true,
        timeout: 3500,
        theme: 'bootstrap',
        onAdd: (toast: ToastData) => {
            console.log('Toast ' + toast.id + ' has been added!');
        },
        onRemove: function(toast: ToastData) {
            console.log('Toast ' + toast.id + ' has been removed!');
        }
    };
    this.toastyService.error(toastOptions);
  }


}
