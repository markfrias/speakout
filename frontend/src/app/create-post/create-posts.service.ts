import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreatePostsService {

  constructor(private httpClient: HttpClient) { }

  submitForm(formData) {
    let resp;
    return this.httpClient.post("http://127.0.0.1:3300/posts/", formData);
  }

  submitBody(data) {
    this.httpClient.post("http://127.0.0.1:3300/posts/body/", data)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      )
  }
}
