import { Component, OnInit } from '@angular/core';
import { PostsService } from './../posts/posts.service';
import { Post } from './../shared/post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { createAotUrlResolver } from '@angular/compiler';

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
import { TopicService } from '../shared/topic.service';
import { Topic } from '../shared/topic.model';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  public editor: any;
  topics;

  constructor (public postsService: PostsService, public topicService: TopicService, private router: Router) {}

  ngOnInit(): void {
    this.showTopics();
    this.refreshTopicList();
  }

  showTopics(){
    this.topicService.getTopics().subscribe((data: any) => this.topics = data);
    console.log(this.topics)
  }

  refreshTopicList(){
    this.topicService.getTopics().subscribe((res) => {
      this.topicService.topicsList = res as Topic[];
    })
  }

  onSubmit(form: NgForm){
    this.postsService.addPost(form.value).subscribe(res => {
      alert('New post created successfully');
    },
    err => {
      alert('error adding new post:' + JSON.stringify(err, undefined, 2));

    }

    );

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
            byFile: 'https://heroku-speakout.herokuapp.com:3300/images/', // Your backend file uploader endpoint
            byUrl: 'https://heroku-speakout.herokuapp.com:3300/images/url', // Your endpoint that provides uploading by Url

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
}

