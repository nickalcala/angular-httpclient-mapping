import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BooksService } from './services/books/books.service';
import { ApiService } from './services/api/api.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    ApiService,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
