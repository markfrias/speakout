import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageFetcherService {

  constructor(private httpClient: HttpClient) { }

  fetchImage(formData) {
    this.httpClient.post<any>("http://heroku-speakout.herokuapp.com/uploads", formData ).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  
  }
}
