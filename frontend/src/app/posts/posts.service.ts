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
    return this.http.get('https://heroku-speakout.herokuapp.com/posts/');
  }
  addPost(post: Post) {
    return this.http.post('https://heroku-speakout.herokuapp.com/posts/', post);
 }

  // Returns results for trending posts
  getTrending() {
    return this.http.get('https://heroku-speakout.herokuapp.com/posts/trending/');
  }

  getSpecificPost(id: string) {
    return this.http.get('https://heroku-speakout.herokuapp.com/posts/' + id);
  }

  incrementLikes(id: string) {
    return this.http.patch('https://heroku-speakout.herokuapp.com/posts/like/' + id, null);
  }

  getLikes(id: string) {
    return this.http.get("https://heroku-speakout.herokuapp.com/posts/like-data/" + id);
  }
  
}
