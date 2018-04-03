import { Injectable } from '@angular/core';
import {Observable, Subject, BehaviorSubject} from "rxjs/Rx";
import { catchError } from 'rxjs/operators';
import {AngularFireAuth } from "angularfire2/auth";
import {AuthInfo} from "./auth-info";
import {Router} from "@angular/router";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null, null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);


    constructor(private afAuth: AngularFireAuth, private router:Router,
        private toastyService: ToastyService, 
        private toastyConfig: ToastyConfig) {

    }

    login(email, password):Observable<AuthInfo> {
        return this.fromFirebaseAuthPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password))
        .pipe(
            catchError(this.handleError('login', AuthInfo))
        );
    }


    signUp(email, password) {
        return this.fromFirebaseAuthPromise(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
    }

    fromFirebaseAuthPromise(promise):Observable<any> {

        const subject = new Subject<any>();

        promise
            .then(res => {
                    console.log(this.afAuth.auth.currentUser.email);
                    const authInfo = new AuthInfo(this.afAuth.auth.currentUser.uid, this.afAuth.auth.currentUser.email);
                    this.authInfo$.next(authInfo);
                    subject.next(res);
                    subject.complete();
                },
                err => {
                    this.authInfo$.error(err);
                    subject.error(err);
                    subject.complete();
                });

        return subject.asObservable();
    }


    logout() {
        this.afAuth.auth.signOut();
        this.authInfo$.next(AuthService.UNKNOWN_USER);
        this.router.navigate(['']);

    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          this.addToastMessage("Error", JSON.stringify(error));
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