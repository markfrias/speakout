import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from './posts.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input() address: string;
  @Input() likeId: string;
  posts;
  trendingPosts;
  incrementedPost;
  

  
  constructor(private postsService : PostsService) {
    this.showPosts();
    this.showTrending();
  }

  ngOnInit(): void {
  }

  showPosts() {
    this.postsService.getPosts()
      .subscribe((data: any) => this.posts = data
      );
    console.log(this.posts);
  }

  showTrending() {
    this.postsService.getTrending()
      .subscribe((data: any) => this.trendingPosts = data
      );
  }

  likeButtonAction(id: string) {
    this.postsService.incrementLikes(id)
      .subscribe();
      // Temporary view refresh
      // !! Change to refresh specific parts only !!
      window.location.reload();
  }

  

}


