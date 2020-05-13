import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/posts/posts.service';
import { ModifyPostsService } from '../modify-posts.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  postId: string;
  postContent;
  editPostForm = new FormGroup({
    title: new FormControl(''),
    postDescription: new FormControl(''),
    author: new FormControl(''),
    postBody: new FormControl(''),
    topics: new FormControl('')
  });
  formData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modifyPostsService: ModifyPostsService,
    private postsService: PostsService
  ) { 
   

  
  }

  ngOnInit(): void {
    
      this.route.params.subscribe(params => {
        this.postId = params['id'].toString();
        console.log(this.postId);
        setTimeout(()=> {
          this.showPostContent(this.postId);
  
        }, 100)
        //console.log(this.articles);
      });
    
  }

  showPostContent(id) {
    this.postsService.getSpecificPost(id)
    .subscribe((result: any) => this.postContent = result
    );

    
    setTimeout(() => {
      console.log(this.postContent);
      this.fillForm();
    }, 150)
  }

  onSubmit() {
    console.log(this.editPostForm.value);
    this.modifyPostsService.submitForm(this.editPostForm.value, this.postId);
  }

  fillForm() {
    this.editPostForm.patchValue({
      title: this.postContent.title,
      postDescription: this.postContent.postDescription,
      author: this.postContent.author,
      postBody: this.postContent.postBody,
      topics: this.postContent.topic
    });
    console.log(this.postContent.title);
  }

}
