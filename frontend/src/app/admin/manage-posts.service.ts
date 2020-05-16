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
    return this.http.get('http://127.0.0.1:3300/posts/');
  }

  deletePost(_id: string) {
    return this.http.delete('http://localhost:3300/posts/' + _id);
  }

}
