import { Component, OnInit } from '@angular/core';
import { PostsService } from './../posts/posts.service';
import { Post } from './../shared/post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { createAotUrlResolver } from '@angular/compiler';
import { CreatePostsService } from '../create-post/create-posts.service';
import { FormGroup, FormControl } from '@angular/forms';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
import ImageTool from '@editorjs/image';
import Checklist from '@editorjs/checklist';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-request-post',
  templateUrl: './request-post.component.html',
  styleUrls: ['./request-post.component.css']
})
export class RequestPostComponent implements OnInit {
  postId: string;
  postContent;
  editPostForm = new FormGroup({
    title: new FormControl(''),
    postDescription: new FormControl(''),
    author: new FormControl(''),
    topics: new FormControl('')
    
  });
  formData;
  public editor: any;
  bodyData: object;
  error: boolean;

  constructor (
    private postsService: PostsService, 
    private router: Router,
    private route: ActivatedRoute,
    private createPostsService: CreatePostsService,
    private httpClient: HttpClient
    ) {
      this.error = false;
    }

  ngOnInit(): void {
    
    // Code for Editor.js initial configuration
  
        this.editor = new EditorJS({
          autofocus: true,
          minHeight: 50,

          tools: {
            header: Header,
            image: {
              class: ImageTool,
              config: {
                field: 'image' ,
                endpoints: {
                  byFile: 'http://127.0.0.1:3300/images/', // Your backend file uploader endpoint
                  byUrl: 'http://127.0.0.1:3300/images/url', // Your endpoint that provides uploading by Url

                }
              }
            },
            checklist: {
              class: Checklist,
              inlineToolbar: true
            },

            list: {
              class: List,
              inlineToolbar: true
            },

            embed: {
              class: Embed,
              inlineToolbar: true,
              config: {
                services: {
                  youtube: true,
                  coub: true
                }
              }
            },

            quote: {
              class: Quote,
              inlineToolbar: true,
              config: {
                quotePlaceholder: 'Enter a quote',
                captionPlaceholder: 'Quote\'s author'
              }
            },

            warning: {
              class: Warning,
              inlineToolbar: true,
              shortcut: 'CMD+SHIFT+W',
              config: {
                titlePlaceholder: 'Title',
                messagePlaceholder: 'Message'
              }
            }
          },
        });
  }

  onSubmit2(form: NgForm){
    this.postsService.addPost(form.value).subscribe(res => {
      alert('New post created successfully');
    },
    err => {
      alert('error adding new post:' + JSON.stringify(err, undefined, 2));
 
    }
    
    );
  }

  onSubmit() {
    console.log(typeof this.editPostForm.value);
    //this.createPostsService.submitForm(this.editPostForm.value);
    this.onSave();
  }

  onSave() {
    this.editor.save().then((outputData) => {
      console.log('Article data: ', outputData)
      this.bodyData = outputData;
      console.log(this.bodyData);

      const newObj =  {
        ...this.editPostForm.value,
        postBody: this.bodyData,
        published: false
      }

      this.bodyData = newObj;
  
      console.log(newObj);
      this.submitForm();
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
    
    
    
  }
 
  submitForm() {
      let userData;
      console.log(this.bodyData);
      this.createPostsService.submitForm(this.bodyData).subscribe(
        (res) => {userData = res},
        (err) => {userData = err} 
      )

      setTimeout(() => {
        if (userData._id != undefined) {
          alert(`New post with id ${userData._id} successfully sent to content reviewers`);
          this.postId = userData._id;
          setTimeout(() => {
            this.postId = undefined;
          }, 5000)
        } else 
          alert("Post not created");
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 5000)
      }, 1000)
      
      
  }
}
