import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users;

  constructor(private manageUserService : UsersService) {
    this.showUsers();
  }

  ngOnInit(): void {
  }

  showUsers() {
    this.manageUserService.getUsers()
      .subscribe((data: any) => this.users = data
      );
    console.log(this.users);
  }

}
