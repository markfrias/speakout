import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Post } from './../shared/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  selectedPost: Post = {
    _id: "",
    title: "",
    postDescription: "",
    author: "",
    postBody: "",
    timestamp: null,
    /*topic: "",*/
    likes: null,
    shares: null,
    comments: "",
    bannerImageName:"",
  };

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get('http://127.0.0.1:3300/posts/');
  }
  addPost(post: Post) {
    return this.http.post('http://localhost:3300/posts/', post);
 }

  // Returns results for trending posts
  getTrending() {
    return this.http.get('http://127.0.0.1:3300/posts/trending/');
  }

  getSpecificPost(id: string) {
    return this.http.get('http://127.0.0.1:3300/posts/' + id);
  }

  incrementLikes(id: string) {
    return this.http.patch('http://127.0.0.1:3300/posts/like/' + id, null);
  }

  getLikes(id: string) {
    return this.http.get("http://127.0.0.1:3300/posts/like-data/" + id);
  }
  
}
