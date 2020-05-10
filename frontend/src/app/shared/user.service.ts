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

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }
  //Http Methods
  postUser(user: User){
    return this.http.post(this.baseURL, user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(this.baseURL + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile () {
    return this.http.get(this.baseURL + '/user-profile')
  }


  //Helper Methods
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
