import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  trendingPosts;
  constructor(private postsService: PostsService) {
    this.showTrending();
   }

  ngOnInit(): void {
  }

  showTrending() {
    this.postsService.getTrending()
      .subscribe((data: any) => this.trendingPosts = data
      );
  }

}
