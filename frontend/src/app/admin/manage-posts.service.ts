import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagePostsService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get('https://heroku-speakout.herokuapp.com/posts/');
  }

  deletePost(_id: string) {
    return this.http.delete('https://heroku-speakout.herokuapp.com/posts/' + _id);
  }

}
