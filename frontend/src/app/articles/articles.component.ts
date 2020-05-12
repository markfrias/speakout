import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostsService } from '../posts/posts.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentsService } from './comments.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  name$: Observable<any>;
  postId: string;
  articles;
  comment = new FormControl('');
  commentData;
  commentForm = new FormGroup({
    comments: new FormControl('')
    })
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private commentService: CommentsService

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

  showComment() {
    console.log(this.comment.value);
    this.comment.valueChanges
      .subscribe((data: any) => this.commentData = data 
    );
    console.log(this.commentData);
  }

  onSubmit() {
    console.warn(this.commentForm.value);
    this.commentService.fetchForm(this.commentForm.value, this.postId);
    
    // Set timeout before refreshing article contents
    // !! Replace method to refresh comments only !!
    setTimeout(() => {
      this.showArticle(this.postId);

    }, 250)
  }


}
