import { Injectable } from '@angular/core';

import{ 
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import {AngularFireAuth } from "angularfire2/auth";
import {LocalStorageService} from 'ngx-localstorage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    IdToken: string;

    constructor(private afAuth: AngularFireAuth, private _storageService: LocalStorageService){
        
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        this.afAuth.auth.currentUser.getIdToken().then(idToken => {
                console.log(idToken);
                this.IdToken = idToken;
                this._storageService.set('firebaseIdToken', idToken);
                let headers = new HttpHeaders();
                //headers.append('Authorization', 'Bearer ' + idToken);
                headers.append('Content-Type', 'application/json');
                var authRequest = request.clone(
                        {   
                            headers: headers,
                            withCredentials: true
                        });
                console.log("REQUEST !" + JSON.stringify(authRequest));
                return next.handle(authRequest);
            }
        );
        return next.handle(request);
    }
}