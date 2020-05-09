import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

import { User } from './../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(private http: HttpClient) { }
  readonly baseURL = 'http://127.0.0.1:3300/users/';
  selectedUser: User;
  users: User[];

  //get all users
  getUsers() {
    return this.http.get(this.baseURL);
  }

  //delete user
  deleteUser(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  //edit user in the database (put method)
  editUser(user : User) {
    return this.http.put(this.baseURL + `/${user._id}`, user);
  }
}
