import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get('http://127.0.0.1:3300/posts/');
  }

  // Returns results for trending posts
  getTrending() {
    return this.http.get('http://127.0.0.1:3300/posts/trending/');
  }

  getSpecificPost(id: string) {
    return this.http.get('http://127.0.0.1:3300/posts/' + id);
  }
}
