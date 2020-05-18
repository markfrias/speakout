import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) { }

  fetchForm(formData, id){
    this.httpClient.patch<any>("https://heroku-speakout.herokuapp.com/posts/comment/" + id, formData ).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
