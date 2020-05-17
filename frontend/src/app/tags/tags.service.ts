import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  
  topicParam: string;

  constructor(private http: HttpClient) {}

  // Returns all topics
  getTopics() {
    return this.http.get('http://heroku-speakout.herokuapp.com/topics/');
  }

  // Returns posts related to topic
  getArticles(id) {
    return this.http.get('http://heroku-speakout.herokuapp.com/posts/topics/' + id);
  }
}


