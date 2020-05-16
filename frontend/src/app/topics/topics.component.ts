import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ NgForm } from '@angular/forms';

import { UserService } from './../shared/user.service';
import { TopicService } from './../shared/topic.service';
import { Topic } from '../shared/topic.model';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topics;
  userDetails;

  constructor(public topicService: TopicService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshTopicsList();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      });
  }

  //retrieve all users from the database
  showTopics() {
    this.topicService.getTopics()
      .subscribe((data: any) => this.topics = data
      );
    console.log(this.topics);
  }

  //reset edit user form
  resetForm(form ?: NgForm) {
    if (form)
      form.reset();
    this.topicService.selectedTopic = {
      _id: "",
      topicName: "",
      description: ""
    }
  }

  onSubmit(form : NgForm) {
    //add new topic
    if (form.value._id == "") {
      this.topicService.postTopic(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshTopicsList();
        alert('New topic added Successfully!');
      });

    //update exixting topic
    } else {
      this.topicService.editTopic(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshTopicsList();
        alert('Topic record updated Successfully');
      });
    }
  }

  //refresh topics list
  refreshTopicsList() {
    this.topicService.getTopics().subscribe((res) => {
      this.topicService.topicsList = res as Topic[];
    });
  }

  //edit or update topic
  onEdit(topic : Topic) {
    this.topicService.selectedTopic = topic;
  }

  //delete topic
  onDelete(_id : string) {
    if(confirm('Are you sure you want to delete this topic record?') == true) {
      this.topicService.deleteTopic(_id).subscribe((res) => {
        this.refreshTopicsList();
        alert('Topic Deleted successfully');
      });
    }
  }

  //logout button function (on the left side bar)
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/home']);
  }

}
