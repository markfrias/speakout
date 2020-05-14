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

  constructor(private manageUserService : UsersService, public userService: UserService, private router: Router) {
    this.showUsers();
  }

  ngOnInit(): void {
    this.resetForm();
    this.refreshUsersList();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      }
    );
  }
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

  onUpdate(form: NgForm) {
    this.userService.editUser(form.value).subscribe(res => {
         //reset form after updating user info
         this.resetForm(form);
         alert('User record updated Successfully');
       },
       err => {
         alert('Error in updating user profile:' + JSON.stringify(err, undefined, 2));
       });
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
    this.userService.selectedUser = user;
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
