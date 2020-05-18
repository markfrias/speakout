import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageFetcherService {

  constructor(private httpClient: HttpClient) { }

  fetchImage(formData) {
    this.httpClient.post<any>("http://127.0.0.1:3300/uploads", formData ).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  
  }
}
