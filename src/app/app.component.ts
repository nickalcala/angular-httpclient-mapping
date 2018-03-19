import { Component } from '@angular/core';
import { Book } from './models/book';
import { BooksService } from './services/books/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`.book {
    border: solid 1px #000;
    margin-bottom: 15px;
  }`]
})
export class AppComponent {

  books: Book[] = [];

  constructor(
    private service: BooksService
  ) {
  }

  ngOnInit() {
    this.service.getBooks()
      .subscribe((response: Book[]) => {
        this.books = response;
      });
  }
}