import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable} from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import { BookCriteria } from '../../shared/models/book-criteria';
import { BookResult } from '../../shared/models/book-result';

const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class BookServiceService {
  private bookApisURL = `${environment.ApiUrl}/api/books/search`;
  
  constructor(private httpClient:HttpClient, 
    private toastyService:ToastyService, 
    private toastyConfig: ToastyConfig) {

  }

  public searchBooks(model) : Observable<BookResult[]> {
    var getURL = `${this.bookApisURL}?keyword=${model.keyword}&searchType=${model.searchType}&sortBy=${model.sortBy}&currentPerPage=${model.currentPerPage}&itemsPerPage=${model.itemsPerPage}`;
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
