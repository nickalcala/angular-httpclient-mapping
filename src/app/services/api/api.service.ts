import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// Import rxjs map so we can manipulate
// the response for the subscriber.
import 'rxjs/add/operator/map';

// Interface so http client methods returns Observable<T> since HttpClient have
// many versions of a method like get(), post(), etc.
interface IApiResponse {
  headers?: HttpHeaders | { [header: string]: string | string[] },
  observe?: 'body',
  params?: HttpParams | { [param: string]: string | string[] },
  reportProgress?: boolean,
  responseType?: 'json',
  withCredentials?: boolean,
}

// Interface that will help us generate an instance from a generic.
interface IEntity<T> {
  new(...args: any[]): T;
}

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  // This will be the get method we will use in the application
  // instead of using the methods directly from HttpClient.
  get<T>(type, url) {
    return this.http.get<T>(url)
      .map(response => {
        return this._unserialize<T>(type, response);
      });
  }

  // We unserialize the properties with the help of the hidden
  // properties (_jsonUnserializeMeta) added by the decorators.
  private _unserialize<T>(type: IEntity<T>, response: any) {

    // If the response is an array we loop through it.
    if (Array.isArray(response)) {

      // We will add the items in this array.
      let entities = [];

      response.forEach(item => {

        // Create an instance of the type
        let entity = this._instantiate(type);

        // Assign the properties
        if (entity.constructor.prototype.hasOwnProperty('_jsonUnserializeMeta')) {
          entity.constructor.prototype._jsonUnserializeMeta.forEach(property => {
            entity[property.prop] = item[property.jsonProp];
          });
        }

        // Push the new item created.
        entities.push(entity);
      });

      // Return the array
      return entities;
    }

    // If the response is not an array
    // Create an instance of the type
    let entity = this._instantiate(type);

    // Assign the properties
    if (entity.constructor.prototype.hasOwnProperty('_jsonUnserializeMeta')) {
      entity.constructor.prototype._jsonUnserializeMeta.forEach(property => {
        entity[property.prop] = response[property.jsonProp];
      });
    }

    // Return the object
    return entity;
  }

  // A method to help us create instances 
  private _instantiate<T>(type: IEntity<T>): T {
    return new type();
  }
}