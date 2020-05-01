import { Component, OnInit, Input } from '@angular/core';
import { TagsService } from './tags.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  @Input() paramId: string;

  topics;
  articles;
  topicParam: string;
  topicName: string;

  articleShown: boolean;
  constructor(private tagsService: TagsService) { 
    !this.articleShown;
    this.showTags();

  }

  ngOnInit(): void {
  }

  showTags() {
    this.tagsService.getTopics()
      .subscribe((data: any) => this.topics = data
      );
  }

  fetchArticle(id) {
    this.tagsService.getArticles(id)
    .subscribe((data: any) => this.articles = data);
  }

  showPost(id: string, topicName: string) {
    this.articleShown = true;
    console.log(this.articleShown);
    console.log(id);
    this.topicParam = id;
    this.topicName = topicName;

      this.fetchArticle(this.topicParam);
      console.log(this.articles);

    
  }

}
