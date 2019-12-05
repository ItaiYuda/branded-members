import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models';
import { UserService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  descending: boolean;
  users = [];
  searchText: string;
  serachAge: number;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.descending = false;
    this.searchText = '';
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService
      .getUsers()
      .pipe(first())
      .subscribe(users => (this.users = users));
  }

  orderByAge() {
    // tslint:disable-next-line:no-debugger
    console.log(typeof this.users[0].age);
    if (this.descending) {
      this.users.sort((a, b) => {
        return a.age - b.age;
      });
    } else {
      this.users.sort((a, b) => {
        return b.age - a.age;
      });
    }
    this.descending = !this.descending;
  }

  renderUsers() {
    debugger;
    return this.users.filter(
      user =>
        user.userName.toLowerCase().includes(this.searchText.toLowerCase()) &&
        user.age >= (this.serachAge || 0)
    );
  }
}
