import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) { }

  fetchForm(formData, id){
    this.httpClient.patch<any>("http://127.0.0.1:3300/posts/comment/" + id, formData ).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
