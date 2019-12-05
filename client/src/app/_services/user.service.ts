import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:5000/member';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.usersUrl);
  }
}
