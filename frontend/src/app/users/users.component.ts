import { Component, OnInit } from '@angular/core';
import{ NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UsersService } from './users.service';
import { UserService } from './../shared/user.service';
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
  userDetails;

  constructor(private manageUserService : UsersService, private userService: UserService, private router: Router) {
    this.showUsers();
  }

  ngOnInit(): void {
    this.refreshUsersList();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      }
    );
  }

  //refresh users list
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
  //logout user
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/posts']);
  }

}
