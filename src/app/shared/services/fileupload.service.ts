import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable} from 'rxjs/Rx';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

const httpOptions = { 
  
};

@Injectable()
export class FileuploadService {
  private uploadApiUrl: string = "http://localhost:3000/upload-firestore"
  constructor(private httpClient: HttpClient,
    private toastyService: ToastyService, 
    private toastyConfig: ToastyConfig) { }

  upload(fileModel: any){
    var finalUrl = this.uploadApiUrl;
    return this.httpClient.post(finalUrl, fileModel, httpOptions).pipe(
      catchError(this.handleError('fileUpload', fileModel.get('coverThumbnail')))
    );
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
