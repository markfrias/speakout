import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModifyPostsService {

  constructor(private httpClient: HttpClient) { }

  submitForm(formData, id){
    this.httpClient.patch<any>("https://heroku-speakout.herokuapp.com/posts/" + id, formData ).subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
      
    );
    console.log("hello");

    
  }

  submitBody(data, id) {
    console.log("Service reached");
    this.httpClient.patch<any>('https://heroku-speakout.herokuapp.com/posts/body/' + id, data).subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
    );
    console.log(id);
  }
}
