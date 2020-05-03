import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostsService } from '../posts/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  name$: Observable<any>;
  postId: string;
  articles;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,

  ) { 
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = params['id'].toString();
      console.log(this.postId);
      this.showArticle(this.postId);
      console.log(this.articles);
    });
  }

  showArticle(id) {
      this.postsService.getSpecificPost(id)
      .subscribe((data: any) => this.articles = data
      );
      console.log(this.articles);
  }

}
