import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable} from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import { BookCriteria } from '../../shared/models/book-criteria';
import { BookResult } from '../../shared/models/book-result';
import { Book } from '../../shared/models/book';
import {AngularFireAuth } from "angularfire2/auth";
import {LocalStorageService} from 'ngx-localstorage';

@Injectable()
export class BookServiceService {
  private bookRootApiUrl  = `${environment.ApiUrl}/api/books`;
  private searchBookApiURL = this.bookRootApiUrl + "/search";
  
  constructor(private httpClient: HttpClient, 
    private toastyService: ToastyService, 
    private toastyConfig: ToastyConfig,
    private afAuth: AngularFireAuth,private _storageService: LocalStorageService) {

  }

  public addBook (book: Book): Observable<Book> {
    console.log(book);
    console.log(this.bookRootApiUrl);
    let idToken= this._storageService.get('firebaseIdToken');
    return this.httpClient.post<Book>(this.bookRootApiUrl, 
      book,
      {headers: new HttpHeaders().set('Authorization', `Bearer ${idToken}`)})
      .pipe(
        catchError(this.handleError('addBook', book))
      );
  }

  public updateBook (book: Book): Observable<Book> {
    console.log(book);
    console.log(this.bookRootApiUrl);
    let idToken= this._storageService.get('firebaseIdToken');
    return this.httpClient.put<Book>(this.bookRootApiUrl, 
      book,
      {headers: new HttpHeaders().set('Authorization', `Bearer ${idToken}`)})
      .pipe(
        catchError(this.handleError('updateBook', book))
      );
  }

  public deleteBook (book: Book): Observable<Book> {
    console.log(book);
    console.log(book.id);
    console.log(this.bookRootApiUrl);
    let idToken= this._storageService.get('firebaseIdToken');
    const deleteUrl = `${this.bookRootApiUrl}/${book.id}`; // DELETE api/books/1
    console.log(deleteUrl);
    return this.httpClient.delete<Book>(deleteUrl,
      {headers: new HttpHeaders().set('Authorization', `Bearer ${idToken}`)})
      .pipe(
        catchError(this.handleError('deleteBook', book))
      );
  }

  public searchBooks(model) : Observable<BookResult[]> {
    let idToken= this._storageService.get('firebaseIdToken');
    var getURL = `${this.searchBookApiURL}?keyword=${model.keyword}&searchType=${model.searchType}&sortBy=${model.sortBy}&currentPerPage=${model.currentPerPage}&itemsPerPage=${model.itemsPerPage}`;
    return this.httpClient.get<BookResult[]>(getURL, 
      {headers: new HttpHeaders().set('Authorization', `Bearer ${idToken}`)}
    )
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
