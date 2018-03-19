import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Book } from '../../models/book';

@Injectable()
export class BooksService {

  constructor(
    private api: ApiService
  ) {
  }

  getBooks() {
    return this.api.get<Array<Book>>(Book, 'books.json');
  }

}