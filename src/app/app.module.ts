import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ToastyModule } from 'ng2-toasty';
import { NgxLocalStorageModule } from 'ngx-localstorage';

import {firebaseConfig} from "../environments/firebase.config";
import {AngularFireModule} from "angularfire2";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from './shared/security/auth.service';
import { AuthGuard } from './shared/security/auth.guard';

import {
  FooterComponent,
  HeaderComponent,
  BookServiceService,
  FileuploadService,
  BookfirebaseService,
  SharedModule
} from './shared';

import {
  BookModule
} from './book';

import {
  SecurityModule
} from './security';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([]);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HomeModule,
    rootRouting,
    SharedModule,
    BookModule,
    SecurityModule,
    ToastyModule,
    NgxLocalStorageModule.forRoot()
  ],
  providers: [BookServiceService ,FileuploadService, BookfirebaseService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
