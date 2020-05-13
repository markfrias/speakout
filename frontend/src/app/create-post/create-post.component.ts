import { Component, OnInit } from '@angular/core';
import { PostsService } from './../posts/posts.service';
import { Post } from './../shared/post.model';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { createAotUrlResolver } from '@angular/compiler';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor (public postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    this.postsService.addPost(form.value).subscribe(res => {
      alert('New post created successfully');
    },
    err => {
      alert('error adding new post:' + JSON.stringify(err, undefined, 2));
 
    }
    
    );
  }

}

