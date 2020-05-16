import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ManagePostsService } from './manage-posts.service';
import { UserService } from './../shared/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  posts;
  userDetails

  constructor(private managePostService : ManagePostsService, private userService: UserService, private router: Router) {
    this.showPosts();
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      }
    );
  }

  showPosts() {
    this.managePostService.getPosts()
      .subscribe((data: any) => this.posts = data
      );
    console.log(this.posts);
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/home']);
  }

  //delete post
  onDelete(_id : string) {
    if(confirm('Are you sure you want to delete this Post?') == true) {
      this.managePostService.deletePost(_id).subscribe((res) => {
        this.showPosts();
        alert('Post Deleted successfully');
      });
    }
  }

}
