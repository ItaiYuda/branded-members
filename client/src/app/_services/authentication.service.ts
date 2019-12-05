import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticationUrl = 'http://localhost:5000';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(loginUser) {
    return this.http
      .post<User>(
        `${this.authenticationUrl}/auth`,
        {
          email: loginUser.email,
          password: loginUser.password
        },
        { observe: 'response' }
      )
      .pipe(
        map(response => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(response.body));
          this.currentUserSubject.next(response.body);
          return response.body;
        })
      );
  }

  register(user: User) {
    return this.http
      .post<User>(`${this.authenticationUrl}/user`, user, {
        observe: 'response'
      })
      .pipe(
        map(response => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(response.body));
          this.currentUserSubject.next(response.body);
          return response.body;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    debugger;
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
