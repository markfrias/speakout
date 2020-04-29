import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManagePostsService } from './manage-posts.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  posts;

  constructor(private managePostService : ManagePostsService) {
    this.showPosts();
  }

  ngOnInit(): void {
  }

  showPosts() {
    this.managePostService.getPosts()
      .subscribe((data: any) => this.posts = data
      );
    console.log(this.posts);
  }
}
