import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookDetailsComponent } from './book-details/book-details.component';
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
import { AddBookComponent } from './add-book/add-book.component';

const booksRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'books/add',
    component: AddBookComponent
  },
  {
    path: 'books',
    component: BookSearchComponent
  },
  {
    path: 'books-details/:book_id',
    component: BookDetailsComponent
  }
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    booksRouting,
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
  declarations: [BookSearchComponent, BookDetailsComponent, AddBookComponent]
})
export class BookModule { }
