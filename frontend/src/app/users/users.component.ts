import { Component, OnInit } from '@angular/core';
import{ NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { UsersService } from './users.service';
import { User } from './../shared/user.model';

//toast message variable (declared only when using 'materialize styles')
declare var M: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users;

  constructor(private manageUserService : UsersService) {
    this.showUsers();
  }

  ngOnInit(): void {
    this.refreshUsersList();
  }

  //refresh users list after updating user or deleting user
  refreshUsersList() {
    this.manageUserService.getUsers().subscribe((res) => {
      this.manageUserService.users = res as User[];
    });
  }

  showUsers() {
    this.manageUserService.getUsers()
      .subscribe((data: any) => this.users = data
      );
    console.log(this.users);
  }

  //edit or update user
  onEdit(user : User) {
    this.manageUserService.selectedUser = user;
  }
  //delete user
  onDelete(_id : string) {
    if(confirm('Are you sure you want to delete this user record?') == true) {
      this.manageUserService.deleteUser(_id).subscribe((res) => {
        this.refreshUsersList();
        M.toast({ html: 'User Deleted successfully', classes: 'rounded' });
        //alert('User Deleted successfully');
      });
    }
  }

}
