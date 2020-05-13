import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModifyPostsService {

  constructor(private httpClient: HttpClient) { }

  submitForm(formData, id){
    this.httpClient.patch<any>("http://127.0.0.1:3300/posts/" + id, formData ).subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
      
    );
    console.log("hello");
  }
}
