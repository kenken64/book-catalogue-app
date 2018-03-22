import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ToastyModule } from 'ng2-toasty';
import { NgxLocalStorageModule } from 'ngx-localstorage';

import {
  FooterComponent,
  HeaderComponent,
  BookServiceService,
  AuthService,
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
    HomeModule,
    rootRouting,
    SharedModule,
    BookModule,
    SecurityModule,
    ToastyModule,
    NgxLocalStorageModule.forRoot()
  ],
  providers: [BookServiceService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
