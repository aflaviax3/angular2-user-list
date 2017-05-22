import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

@Injectable()
export class UserService {
  private usersUrl: string = 'https://randomuser.me/api/?page=5&results=50&seed=abc';

  constructor(private http: Http) {}

  /**
   * Get all users
   */
  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(res => res.json().results)
      .catch(this.handleError);
  }

  /**
   * Get a single user
   */
   getUser(name: string): Observable<User> {
     return this.http.get(this.usersUrl)
          .do(x => console.log(x))
          .map(res => res.json().results)
          .do(x => console.log(x))
          .map( list => list.filter((v,i) => return v.name.first === name))
          .do(x => console.log(x));
   }

  /**
   * Handle any errors from the API
   */
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body   = err.json() || '';
      let error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText} || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }

}
