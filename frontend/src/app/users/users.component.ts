import { Component, OnInit } from '@angular/core';
import{ NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserService } from './../shared/user.service';
import { User } from './../shared/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users;
  userDetails;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshUsersList();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      });
  }

  //reset edit user form
  resetForm(form ?: NgForm) {
    if (form)
      form.reset();
    this.userService.selectedUser = {
      _id: "",
      fname: "",
      lname: "",
      username: "",
      email: "",
      address: "",
      phoneNumber: "",
      password: "",
      role: "",
    }
  }

  //update user record
  onUpdate(form: NgForm) {
    this.userService.editUser(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshUsersList();
      this.userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res['user'];
        });
      alert('User record updated Successfully');
    });
  }

  //refresh users list
  refreshUsersList() {
    this.userService.getUsers().subscribe((res) => {
      this.userService.usersList = res as User[];
    });
  }

  //retrieve all users from the database
  showUsers() {
    this.userService.getUsers()
      .subscribe((data: any) => this.users = data
      );
    console.log(this.users);
  }

  //edit or update user
  onEdit(user : User) {
    this.userService.selectedUser = user;
  }

  //delete user
  onDelete(_id : string) {
    if(confirm('Are you sure you want to delete this user record?') == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.refreshUsersList();
        alert('User Deleted successfully');
      });
    }
  }

  //logout user
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/posts']);
  }

}
