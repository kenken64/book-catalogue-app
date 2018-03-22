import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { PopoverModule } from 'ngx-bootstrap';
import { ProgressbarModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const securityRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    securityRouting,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    BrowserAnimationsModule,
    PaginationModule.forRoot()
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class SecurityModule { }
