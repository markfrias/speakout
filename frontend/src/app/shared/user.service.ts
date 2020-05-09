import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseURL = 'http://localhost:3300/users';
  selectedUser: User = {
    _id: '',
    fname: '',
    lname: '',
    username: '',
    email: '',
    address: '',
    phoneNumber: null,
    password: '',
    role: ''
  };

  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(this.baseURL, user);
  }
}
