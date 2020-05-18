import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Topic } from './topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  readonly baseURL = 'https://localhost:3300/topics';
  selectedTopic: Topic = {
    _id: '',
    topicName: '',
    description: ''
  };
  topicsList: Topic[];

  constructor(private http: HttpClient) { }

  //insert new topic into the database
  postTopic(topic: Topic){
    return this.http.post(this.baseURL, topic);
  }

  //get all topics
  getTopics() {
    return this.http.get(this.baseURL);
  }

  //delete topic
  deleteTopic(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  //edit topic in the database (patch method)
  editTopic(topic : Topic) {
    return this.http.patch(this.baseURL + `/${topic._id}`, topic);
  }

}

