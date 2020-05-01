import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts;

  constructor(private postsService : PostsService) {
    this.showPosts();
  }

  ngOnInit(): void {
  }

  showPosts() {
    this.postsService.getPosts()
      .subscribe((data: any) => this.posts = data
      );
    console.log(this.posts);
  }
}
