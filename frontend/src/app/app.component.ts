import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './shared/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  title = 'frontend';
  userDetails;

  constructor(public userService: UserService, private router: Router){

  }

  ngOnInit(){
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
