import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/posts/posts.service';
import { ModifyPostsService } from '../modify-posts.service';
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



import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';
import { Observable } from 'rxjs';


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
    topics: new FormControl('')
    
  });
  formData;
  public editor: any;
  bodyData: any;
  
  
  

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
      this.showPostContent(this.postId);      
    });
    
      if (this.postContent == undefined)
      console.log("Error");

      else 
      console.log(this.postContent.postBody[0].blocks);

    

      
    // Code for Editor.js initial configuration
    setTimeout(() => {
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
                  byFile: 'http://localhost:3300/images/', // Your backend file uploader endpoint
                  byUrl: 'http://localhost:3300/images/url', // Your endpoint that provides uploading by Url

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

         data: {
            time: this.postContent.postBody[0].time,
          blocks: 
            this.postContent.postBody[0].blocks,
          version: this.postContent.postBody[0].version
          }
        });
      }, 3000)
      
    
  }

  showPostContent(id) {
    
  
    let assignData = new Promise((resolve, reject) => {
      let content = undefined;
      this.postsService.getSpecificPost(id)
      .subscribe((result: any) => content = result)

      setTimeout(() => {
        if (content != undefined){
          resolve(content);
        } else {
          setTimeout(() => {
            if (content != undefined){
              resolve(content);
            } else {
              reject("Cannot load data, please refresh");
            }
          }, 2000)
          
          

        }
          
          
      }, 250)
    })
      
    assignData
      .then((content) => {
        this.postContent = content;
        this.fillForm();
      })
      .catch((message) => {
        console.log(message);
        this.showPostContent(this.postId);
      } )

      
  }

  onSubmit() {
    console.log(this.editPostForm.value);
    this.modifyPostsService.submitForm(this.editPostForm.value, this.postId);
    this.onSave();
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

  showData() : string {
    return this.postContent.postBody;
  }

  onSave() {
    this.editor.save().then((outputData) => {
      console.log('Article data: ', outputData)
      this.bodyData = outputData;
      console.log(this.bodyData);
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
    this.submitForm();
    
  }
 
  submitForm() {
    console.log(this.postId);
    setTimeout(() => {
      console.log(this.bodyData);
      this.modifyPostsService.submitBody(this.bodyData, this.postId);
    }, 1000)
   
  }
}

/*export class SimpleImage {

  public data;

  static get toolbox() {
      return {
        title: 'Image',
        icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
      };
  }

  constructor({data}){
    this.data = data;
  }
  
  render() {
    const input = document.createElement('input');
    input.value = this.data && this.data.url ? this.data.url : '';
    return input;
  }

  save(blockContent){
      return {
          url: blockContent.value
      }
  }

} */