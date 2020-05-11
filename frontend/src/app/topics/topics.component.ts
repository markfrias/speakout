import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../shared/user.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
topics;
userDetails;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      }
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/posts']);
  }

}
