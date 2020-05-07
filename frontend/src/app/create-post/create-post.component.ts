import { Component, OnInit } from '@angular/core';
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor (private popup:Popup) {}
  
  clickButton(){
    this.popup.show()
  }
  ngOnInit(): void {
  }

}
